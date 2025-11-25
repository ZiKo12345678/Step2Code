import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.83.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, taskInstanceId, userId } = await req.json();
    
    console.log('AI Judge received request:', { taskInstanceId, userId });

    if (!code || !taskInstanceId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get task instance with template
    const { data: taskInstance, error: taskError } = await supabase
      .from('task_instances')
      .select(`
        *,
        task_templates (
          id,
          title,
          description,
          difficulty,
          tests_json
        )
      `)
      .eq('id', taskInstanceId)
      .single();

    if (taskError || !taskInstance) {
      console.error('Error fetching task:', taskError);
      return new Response(
        JSON.stringify({ error: 'Task not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const task = taskInstance.task_templates;
    const tests = task.tests_json;

    console.log('Task loaded:', { title: task.title, difficulty: task.difficulty });

    // Prepare prompt for ChatGPT
    const prompt = `Ты — строгий валидатор задач по программированию.
Ты должен проверять решение только на основе тестов.

Задача:
${task.description}

Тесты:
${JSON.stringify(tests, null, 2)}

Код пользователя:
\`\`\`javascript
${code}
\`\`\`

Проверь только логику решения. Ты НЕ должен исполнять код.
Анализируй по тестам и описанию задачи.

Ответь строго в формате JSON:
{
  "status": "correct" или "incorrect",
  "reason": "краткое объяснение"
}`;

    // Call OpenAI API
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Calling OpenAI API...');
    
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a strict code validator. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'AI validation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResult = await openAIResponse.json();
    const aiContent = JSON.parse(aiResult.choices[0].message.content);
    
    console.log('AI response:', aiContent);

    const isPassed = aiContent.status === 'correct';
    const resultStatus = isPassed ? 'passed' : 'failed';

    // Calculate points based on difficulty
    let earnedPoints = 0;
    if (isPassed) {
      switch (task.difficulty) {
        case 'Easy':
          earnedPoints = 1;
          break;
        case 'Medium':
          earnedPoints = 2;
          break;
        case 'Hard':
          earnedPoints = 3;
          break;
      }
    }

    // Save solution
    const { error: solutionError } = await supabase
      .from('solutions')
      .insert({
        user_id: userId,
        task_instance_id: taskInstanceId,
        code,
        language: 'javascript',
        result: resultStatus,
        stdout: aiContent.reason,
      });

    if (solutionError) {
      console.error('Error saving solution:', solutionError);
    }

    // Update task instance
    if (isPassed) {
      const { error: updateError } = await supabase
        .from('task_instances')
        .update({
          status: 'solved',
          solved_at: new Date().toISOString(),
          earned_points: earnedPoints,
        })
        .eq('id', taskInstanceId);

      if (updateError) {
        console.error('Error updating task instance:', updateError);
      }

      // Increment user points
      const { error: pointsError } = await supabase.rpc('increment_user_points', {
        user_id: userId,
        points_to_add: earnedPoints,
      });

      if (pointsError) {
        console.error('Error incrementing points:', pointsError);
      }
    } else {
      // Update task instance as failed
      const { error: updateError } = await supabase
        .from('task_instances')
        .update({
          status: 'assigned',
        })
        .eq('id', taskInstanceId);

      if (updateError) {
        console.error('Error updating task instance:', updateError);
      }
    }

    console.log('AI Judge completed:', { status: aiContent.status, earnedPoints });

    return new Response(
      JSON.stringify({
        status: aiContent.status,
        reason: aiContent.reason,
        earnedPoints: isPassed ? earnedPoints : 0,
        passed: isPassed,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('AI Judge error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
