-- Create function to increment user points
CREATE OR REPLACE FUNCTION public.increment_user_points(user_id UUID, points_to_add INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET total_points = total_points + points_to_add
  WHERE id = user_id;
END;
$$;