import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useStepProgress = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["step-progress", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("step_progress")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useUpdateStepProgress = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      userId,
      stepId,
      status,
    }: {
      userId: string;
      stepId: string;
      status: "not_started" | "in_progress" | "verified";
    }) => {
      const { data, error } = await supabase
        .from("step_progress")
        .upsert(
          {
            user_id: userId,
            step_id: stepId,
            status,
            completed_at: status === "verified" ? new Date().toISOString() : null,
          },
          { onConflict: "user_id,step_id" }
        )
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["step-progress"] });
      toast({
        title: "Прогресс обновлен",
        description: "Ваш прогресс успешно сохранен",
      });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить прогресс",
        variant: "destructive",
      });
      console.error("Error updating progress:", error);
    },
  });
};
