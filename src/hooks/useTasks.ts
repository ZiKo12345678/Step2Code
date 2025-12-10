import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTaskTemplate = (stepId: string | undefined) => {
  return useQuery({
    queryKey: ["task-template", stepId],
    queryFn: async () => {
      if (!stepId) return null;
      
      const { data, error } = await supabase
        .from("task_templates")
        .select("*")
        .eq("step_id", stepId)
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!stepId,
  });
};

export const useTaskInstance = (taskInstanceId: string | undefined) => {
  return useQuery({
    queryKey: ["task-instance", taskInstanceId],
    queryFn: async () => {
      if (!taskInstanceId) return null;
      
      const { data, error } = await supabase
        .from("task_instances")
        .select(`
          *,
          task_templates (*)
        `)
        .eq("id", taskInstanceId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!taskInstanceId,
  });
};

export const useCreateTaskInstance = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      userId,
      stepId,
      taskTemplateId,
    }: {
      userId: string;
      stepId: string;
      taskTemplateId: string;
    }) => {
      const { data, error } = await supabase
        .from("task_instances")
        .insert({
          user_id: userId,
          step_id: stepId,
          task_template_id: taskTemplateId,
          status: "assigned",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-instance"] });
      toast({
        title: "Задача получена",
        description: "Теперь вы можете решить эту задачу",
      });
    },
  });
};

export const useSubmitSolution = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      userId,
      taskInstanceId,
      code,
      language,
    }: {
      userId: string;
      taskInstanceId: string;
      code: string;
      language: string;
    }) => {
      const { data, error } = await supabase.functions.invoke("check-solution", {
        body: {
          userId,
          taskInstanceId,
          code,
          language,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task-instance"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user-solutions"] });
      
      if (data.result === "passed") {
        toast({
          title: "Задача решена! 🎉",
          description: `Вы заработали ${data.earnedPoints} баллов`,
        });
      } else {
        toast({
          title: "Тесты не прошли",
          description: "Проверьте решение и попробуйте снова",
          variant: "destructive",
        });
      }
    },
  });
};
