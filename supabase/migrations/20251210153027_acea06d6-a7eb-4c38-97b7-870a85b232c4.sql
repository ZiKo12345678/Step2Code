-- Create a function to get leaderboard data for a specific period
-- This function uses SECURITY DEFINER to bypass RLS and aggregate all users' points
CREATE OR REPLACE FUNCTION public.get_leaderboard_by_period(
  period_type text,
  result_limit integer DEFAULT 50
)
RETURNS TABLE (
  user_id uuid,
  period_points bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  start_date timestamptz;
BEGIN
  -- Calculate start date based on period type
  IF period_type = 'week' THEN
    start_date := now() - interval '7 days';
  ELSIF period_type = 'month' THEN
    start_date := date_trunc('month', now());
  ELSE
    -- For 'all' or any other value, return empty (all-time uses profiles.total_points directly)
    RETURN;
  END IF;

  RETURN QUERY
  SELECT 
    ti.user_id,
    COALESCE(SUM(ti.earned_points), 0)::bigint as period_points
  FROM task_instances ti
  WHERE ti.status = 'solved'
    AND ti.earned_points > 0
    AND ti.solved_at >= start_date
  GROUP BY ti.user_id
  ORDER BY period_points DESC
  LIMIT result_limit;
END;
$$;