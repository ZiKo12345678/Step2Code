import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roadmaps")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });
};

export const useRoadmap = (id: string) => {
  return useQuery({
    queryKey: ["roadmap", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roadmaps")
        .select(`
          *,
          roadmap_steps (
            id,
            title,
            content,
            order_index,
            parent_step_id
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};
