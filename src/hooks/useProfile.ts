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

      // For month/week - use database function that bypasses RLS
      const { data: leaderboardData, error: rpcError } = await supabase
        .rpc("get_leaderboard_by_period", {
          period_type: period,
          result_limit: 50
        });

      if (rpcError) throw rpcError;

      if (!leaderboardData || leaderboardData.length === 0) {
        return [];
      }

      // Get profiles for these users
      const userIds = leaderboardData.map((item: { user_id: string }) => item.user_id);
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, total_points, streak")
        .in("id", userIds);

      if (profileError) throw profileError;

      // Create a map of user_id to period_points
      const pointsByUser: Record<string, number> = {};
      leaderboardData.forEach((item: { user_id: string; period_points: number }) => {
        pointsByUser[item.user_id] = item.period_points;
      });

      // Combine and sort by period points
      const result = profiles?.map((profile) => ({
        ...profile,
        total_points: pointsByUser[profile.id] || 0, // Override with period points
      }))
        .sort((a, b) => b.total_points - a.total_points);

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
