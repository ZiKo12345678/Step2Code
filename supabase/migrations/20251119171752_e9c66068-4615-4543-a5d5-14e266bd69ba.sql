-- Create profiles table linked to auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  total_points INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create roadmaps table
CREATE TABLE public.roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create roadmap_steps table
CREATE TABLE public.roadmap_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID NOT NULL REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  parent_step_id UUID REFERENCES public.roadmap_steps(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create step_progress table
CREATE TABLE public.step_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  step_id UUID NOT NULL REFERENCES public.roadmap_steps(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'verified')),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, step_id)
);

-- Create step_verifications table
CREATE TABLE public.step_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id UUID NOT NULL REFERENCES public.roadmap_steps(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('quiz', 'self_check')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_questions table
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verification_id UUID NOT NULL REFERENCES public.step_verifications(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create task_templates table
CREATE TABLE public.task_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id UUID NOT NULL REFERENCES public.roadmap_steps(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  starter_code TEXT,
  tests_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create task_instances table
CREATE TABLE public.task_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  step_id UUID NOT NULL REFERENCES public.roadmap_steps(id) ON DELETE CASCADE,
  task_template_id UUID NOT NULL REFERENCES public.task_templates(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'solved', 'failed')),
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  solved_at TIMESTAMP WITH TIME ZONE,
  earned_points INTEGER DEFAULT 0
);

-- Create solutions table
CREATE TABLE public.solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_instance_id UUID NOT NULL REFERENCES public.task_instances(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'javascript',
  result TEXT NOT NULL CHECK (result IN ('passed', 'failed')),
  stdout TEXT,
  stderr TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.step_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.step_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for roadmaps (public read)
CREATE POLICY "Roadmaps are viewable by everyone"
  ON public.roadmaps FOR SELECT
  USING (true);

-- RLS Policies for roadmap_steps (public read)
CREATE POLICY "Roadmap steps are viewable by everyone"
  ON public.roadmap_steps FOR SELECT
  USING (true);

-- RLS Policies for step_progress
CREATE POLICY "Users can view their own progress"
  ON public.step_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.step_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.step_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for step_verifications (public read)
CREATE POLICY "Step verifications are viewable by everyone"
  ON public.step_verifications FOR SELECT
  USING (true);

-- RLS Policies for quiz_questions (public read)
CREATE POLICY "Quiz questions are viewable by everyone"
  ON public.quiz_questions FOR SELECT
  USING (true);

-- RLS Policies for task_templates (public read)
CREATE POLICY "Task templates are viewable by everyone"
  ON public.task_templates FOR SELECT
  USING (true);

-- RLS Policies for task_instances
CREATE POLICY "Users can view their own task instances"
  ON public.task_instances FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own task instances"
  ON public.task_instances FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own task instances"
  ON public.task_instances FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for solutions
CREATE POLICY "Users can view their own solutions"
  ON public.solutions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own solutions"
  ON public.solutions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for achievements (public read)
CREATE POLICY "Achievements are viewable by everyone"
  ON public.achievements FOR SELECT
  USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements"
  ON public.user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON public.user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_roadmap_steps_roadmap_id ON public.roadmap_steps(roadmap_id);
CREATE INDEX idx_roadmap_steps_parent_step_id ON public.roadmap_steps(parent_step_id);
CREATE INDEX idx_step_progress_user_id ON public.step_progress(user_id);
CREATE INDEX idx_step_progress_step_id ON public.step_progress(step_id);
CREATE INDEX idx_task_instances_user_id ON public.task_instances(user_id);
CREATE INDEX idx_solutions_user_id ON public.solutions(user_id);
CREATE INDEX idx_user_achievements_user_id ON public.user_achievements(user_id);