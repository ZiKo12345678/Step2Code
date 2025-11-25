import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { userId, taskInstanceId, code, language } = await req.json();

    console.log('Checking solution for task instance:', taskInstanceId);

    // Get task instance and template
    const { data: taskInstance, error: taskError } = await supabaseClient
      .from('task_instances')
      .select(`
        *,
        task_templates (*)
      `)
      .eq('id', taskInstanceId)
      .single();

    if (taskError || !taskInstance) {
      throw new Error('Task instance not found');
    }

    // Run tests (simplified - in production, use a sandbox)
    const tests = taskInstance.task_templates.tests_json as any[];
    let allPassed = true;
    const results: any[] = [];

    try {
      // Create function from code
      const func = new Function('return ' + code)();
      
      for (const test of tests) {
        try {
          const result = func(...test.input);
          const passed = JSON.stringify(result) === JSON.stringify(test.expected);
          allPassed = allPassed && passed;
          
          results.push({
            input: test.input,
            expected: test.expected,
            actual: result,
            passed,
          });
        } catch (error) {
          allPassed = false;
          results.push({
            input: test.input,
            expected: test.expected,
            error: error instanceof Error ? error.message : 'Unknown error',
            passed: false,
          });
        }
      }
    } catch (error) {
      console.error('Error executing code:', error);
      allPassed = false;
    }

    // Calculate points
    const pointsMap = { Easy: 1, Medium: 2, Hard: 3 };
    const earnedPoints = allPassed 
      ? pointsMap[taskInstance.task_templates.difficulty as keyof typeof pointsMap] || 1
      : 0;

    // Save solution
    const { error: solutionError } = await supabaseClient
      .from('solutions')
      .insert({
        user_id: userId,
        task_instance_id: taskInstanceId,
        code,
        language,
        result: allPassed ? 'passed' : 'failed',
        stdout: JSON.stringify(results),
      });

    if (solutionError) throw solutionError;

    // Update task instance
    const { error: updateError } = await supabaseClient
      .from('task_instances')
      .update({
        status: allPassed ? 'solved' : 'failed',
        solved_at: allPassed ? new Date().toISOString() : null,
        earned_points: earnedPoints,
      })
      .eq('id', taskInstanceId);

    if (updateError) throw updateError;

    // Update user points if passed
    if (allPassed) {
      const { error: pointsError } = await supabaseClient.rpc('increment_user_points', {
        user_id: userId,
        points_to_add: earnedPoints,
      });

      if (pointsError) {
        console.error('Error updating points:', pointsError);
      }
    }

    return new Response(
      JSON.stringify({
        result: allPassed ? 'passed' : 'failed',
        earnedPoints,
        tests: results,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
