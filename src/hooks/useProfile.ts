import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, total_points, streak")
        .order("total_points", { ascending: false })
        .limit(50);

      if (error) throw error;
      return data;
    },
  });
};

export const useUserSolutions = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user-solutions", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("solutions")
        .select(`
          *,
          task_instances (
            task_templates (
              title,
              difficulty
            )
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useUserAchievements = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user-achievements", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("user_achievements")
        .select(`
          *,
          achievements (
            code,
            title,
            description
          )
        `)
        .eq("user_id", userId)
        .order("unlocked_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};
