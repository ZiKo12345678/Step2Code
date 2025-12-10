import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Code2, Trophy, Target, Flame, Calendar, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useProfile, useUserSolutions, useUserAchievements } from "@/hooks/useProfile";
import { useStepProgress } from "@/hooks/useStepProgress";

const Profile = () => {
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  const { data: profile } = useProfile(userId);
  const { data: solutions } = useUserSolutions(userId);
  const { data: achievements } = useUserAchievements(userId);
  const { data: progressData } = useStepProgress(userId);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Требуется авторизация</p>
          <Link to="/" className="text-primary hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Загрузка...</p>
      </div>
    );
  }

  const solvedEasy = solutions?.filter(
    (s) => s.task_instances?.task_templates?.difficulty === "Easy" && s.result === "passed"
  ).length || 0;
  const solvedMedium = solutions?.filter(
    (s) => s.task_instances?.task_templates?.difficulty === "Medium" && s.result === "passed"
  ).length || 0;
  const solvedHard = solutions?.filter(
    (s) => s.task_instances?.task_templates?.difficulty === "Hard" && s.result === "passed"
  ).length || 0;
  const solvedTotal = solvedEasy + solvedMedium + solvedHard;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold gradient-text">Step2Code</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                to="/roadmaps"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Roadmaps
              </Link>
              <Link
                to="/leaderboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Лидерборд
              </Link>
              <Link to="/profile" className="text-sm text-foreground font-medium">
                Профиль
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6 bg-card border-border">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    {profile.username?.substring(0, 2).toUpperCase() || "US"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">{profile.username || "Пользователь"}</h2>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{profile.total_points} баллов</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">{profile.streak} дней</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Card */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Статистика решений
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Всего решено:</span>
                  <span className="font-bold">{solvedTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-success">Easy:</span>
                  <span className="font-medium text-success">{solvedEasy}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-warning">Medium:</span>
                  <span className="font-medium text-warning">{solvedMedium}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-destructive">Hard:</span>
                  <span className="font-medium text-destructive">{solvedHard}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-4">Прогресс по темам</h3>
              <div className="space-y-4">
                {progressData && progressData.length > 0 ? (
                  progressData.slice(0, 5).map((progress) => (
                    <div key={progress.id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Шаг #{progress.step_id.substring(0, 8)}</span>
                        <Badge
                          variant={progress.status === "verified" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {progress.status === "verified"
                            ? "Завершено"
                            : progress.status === "in_progress"
                            ? "В процессе"
                            : "Не начато"}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Прогресс пока отсутствует</p>
                )}
              </div>
            </Card>

            {/* Recent Solutions */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-4">Последние решения</h3>
              <div className="space-y-3">
                {solutions && solutions.length > 0 ? (
                  solutions.slice(0, 5).map((solution) => (
                    <div
                      key={solution.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium">
                          {solution.task_instances?.task_templates?.title || "Задача"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(solution.created_at).toLocaleDateString("ru-RU")}
                        </p>
                      </div>
                      <Badge
                        variant={solution.result === "passed" ? "default" : "destructive"}
                        className={
                          solution.task_instances?.task_templates?.difficulty === "Easy"
                            ? "bg-success/10 text-success"
                            : solution.task_instances?.task_templates?.difficulty === "Medium"
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                        }
                      >
                        {solution.task_instances?.task_templates?.difficulty || "Unknown"}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Решений пока нет</p>
                )}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Достижения
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements && achievements.length > 0 ? (
                  achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center"
                    >
                      <div className="text-3xl mb-2">🏆</div>
                      <p className="font-medium text-sm">
                        {achievement.achievements?.title || "Достижение"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.achievements?.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-sm text-muted-foreground text-center">
                    Достижений пока нет
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
