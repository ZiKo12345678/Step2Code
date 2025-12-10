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

export const useLeaderboard = (period: "all" | "month" | "week" = "all") => {
  return useQuery({
    queryKey: ["leaderboard", period],
    queryFn: async () => {
      if (period === "all") {
        // All time - use total_points from profiles
        const { data, error } = await supabase
          .from("profiles")
          .select("id, username, avatar_url, total_points, streak")
          .order("total_points", { ascending: false })
          .limit(50);

        if (error) throw error;
        return data;
      }

      // For month/week - aggregate from task_instances
      const now = new Date();
      let startDate: string;

      if (period === "month") {
        // Start of current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      } else {
        // Last 7 days
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        startDate = weekAgo.toISOString();
      }

      // Get solved task instances with earned points in the time period
      const { data: taskData, error: taskError } = await supabase
        .from("task_instances")
        .select("user_id, earned_points")
        .eq("status", "solved")
        .gt("earned_points", 0)
        .gte("solved_at", startDate);

      if (taskError) throw taskError;

      // Aggregate points by user
      const pointsByUser: Record<string, number> = {};
      taskData?.forEach((task) => {
        if (task.user_id && task.earned_points) {
          pointsByUser[task.user_id] = (pointsByUser[task.user_id] || 0) + task.earned_points;
        }
      });

      const userIds = Object.keys(pointsByUser);
      if (userIds.length === 0) {
        return [];
      }

      // Get profiles for these users
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, total_points, streak")
        .in("id", userIds);

      if (profileError) throw profileError;

      // Combine and sort by period points
      const result = profiles?.map((profile) => ({
        ...profile,
        total_points: pointsByUser[profile.id] || 0, // Override with period points
      }))
        .sort((a, b) => b.total_points - a.total_points)
        .slice(0, 50);

      return result || [];
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
