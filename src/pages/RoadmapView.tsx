import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Code2, CheckCircle2, Circle, Lock, PlayCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRoadmap } from "@/hooks/useRoadmaps";
import { useStepProgress, useUpdateStepProgress } from "@/hooks/useStepProgress";
import { useTaskTemplate, useCreateTaskInstance } from "@/hooks/useTasks";
import { supabase } from "@/integrations/supabase/client";
import { QuizVerification } from "@/components/QuizVerification";
import { SelfCheckVerification } from "@/components/SelfCheckVerification";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const RoadmapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string>();
  const [selectedStep, setSelectedStep] = useState<any>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationData, setVerificationData] = useState<any>(null);

  const { data: roadmap, isLoading } = useRoadmap(id!);
  const { data: progressData } = useStepProgress(userId);
  const updateProgress = useUpdateStepProgress();
  const { data: taskTemplate } = useTaskTemplate(selectedStep?.id);
  const createTask = useCreateTaskInstance();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  const getStepProgress = (stepId: string) => {
    return progressData?.find((p) => p.step_id === stepId);
  };

  const handleStepClick = async (step: any) => {
    if (!userId) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите, чтобы отслеживать прогресс",
        variant: "destructive",
      });
      return;
    }

    setSelectedStep(step);

    // Fetch verification data
    const { data: verification } = await supabase
      .from("step_verifications")
      .select(`
        *,
        quiz_questions (*)
      `)
      .eq("step_id", step.id)
      .maybeSingle();

    setVerificationData(verification);
  };

  const handleMarkComplete = async () => {
    if (!userId || !selectedStep) return;

    const progress = getStepProgress(selectedStep.id);
    if (progress?.status === "verified") {
      setShowVerification(false);
      return;
    }

    if (verificationData) {
      setShowVerification(true);
    } else {
      await updateProgress.mutateAsync({
        userId,
        stepId: selectedStep.id,
        status: "verified",
      });
      setSelectedStep(null);
    }
  };

  const handleVerificationComplete = async (passed: boolean) => {
    if (!userId || !selectedStep) return;

    if (passed) {
      await updateProgress.mutateAsync({
        userId,
        stepId: selectedStep.id,
        status: "verified",
      });
      
      // Automatically create task instance after successful quiz
      try {
        const { data: template } = await supabase
          .from("task_templates")
          .select("*")
          .eq("step_id", selectedStep.id)
          .limit(1)
          .maybeSingle();

        if (template) {
          const taskInstance = await createTask.mutateAsync({
            userId,
            stepId: selectedStep.id,
            taskTemplateId: template.id,
          });
          
          toast({
            title: "Задача назначена! 🎯",
            description: "Теперь решите практическую задачу",
          });
          
          // Navigate to task page
          navigate(`/task/${taskInstance.id}`);
        } else {
          toast({
            title: "Шаг завершён! ✅",
            description: "Для этого шага нет практической задачи",
          });
        }
      } catch (error) {
        console.error("Error creating task:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось создать задачу",
          variant: "destructive",
        });
      }
      
      setShowVerification(false);
      setSelectedStep(null);
    } else {
      toast({
        title: "Попробуйте снова",
        description: "Изучите материал еще раз",
        variant: "destructive",
      });
      setShowVerification(false);
    }
  };

  const handleGetTask = async () => {
    if (!userId || !selectedStep || !taskTemplate) return;

    const taskInstance = await createTask.mutateAsync({
      userId,
      stepId: selectedStep.id,
      taskTemplateId: taskTemplate.id,
    });

    navigate(`/task/${taskInstance.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Roadmap не найден</p>
      </div>
    );
  }

  const steps = roadmap.roadmap_steps || [];
  const totalSteps = steps.length;
  // Filter progress only for steps in current roadmap
  const stepIds = steps.map(s => s.id);
  const completedSteps = progressData?.filter(
    (p) => p.status === "verified" && stepIds.includes(p.step_id)
  ).length || 0;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

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
              <Link to="/roadmaps" className="text-sm text-foreground font-medium">
                Roadmaps
              </Link>
              <Link
                to="/leaderboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Лидерборд
              </Link>
              <Link
                to="/profile"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Профиль
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/roadmaps" className="text-sm text-muted-foreground hover:text-foreground">
            ← Назад к roadmaps
          </Link>
        </div>

        {/* Progress Header */}
        <Card className="p-6 mb-8 bg-card border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{roadmap.title}</h1>
              <p className="text-muted-foreground">{roadmap.description}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Прогресс</span>
              <span className="font-medium">
                {completedSteps} / {totalSteps} шагов
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </Card>

        {/* Steps List */}
        <div className="space-y-4">
          {steps
            .sort((a, b) => a.order_index - b.order_index)
            .map((step) => {
              const stepProgress = getStepProgress(step.id);
              const isCompleted = stepProgress?.status === "verified";
              const isInProgress = stepProgress?.status === "in_progress";

              return (
                <Card
                  key={step.id}
                  className={`p-6 cursor-pointer hover:shadow-lg transition-all ${
                    isCompleted ? "border-success" : ""
                  }`}
                  onClick={() => handleStepClick(step)}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      ) : isInProgress ? (
                        <PlayCircle className="w-6 h-6 text-primary" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      {step.content && (
                        <p className="text-sm text-muted-foreground">{step.content}</p>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
        </div>
      </div>

      {/* Step Detail Dialog */}
      <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedStep?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedStep?.content && (
              <div>
                <h4 className="font-semibold mb-2">Описание</h4>
                <p className="text-sm text-muted-foreground">{selectedStep.content}</p>
              </div>
            )}

            {showVerification && verificationData ? (
              verificationData.type === "quiz" && verificationData.quiz_questions ? (
                <QuizVerification
                  questions={verificationData.quiz_questions}
                  onComplete={handleVerificationComplete}
                />
              ) : (
                <SelfCheckVerification onComplete={handleVerificationComplete} />
              )
            ) : (
              <div className="space-y-4">
                {getStepProgress(selectedStep?.id)?.status === "verified" ? (
                  <>
                    <Badge variant="outline" className="bg-success/10 text-success">
                      Тема пройдена
                    </Badge>
                    {taskTemplate && (
                      <Button onClick={handleGetTask} className="w-full">
                        Получить практическую задачу
                      </Button>
                    )}
                  </>
                ) : (
                  <Button onClick={handleMarkComplete} className="w-full">
                    Пометить как изученное
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoadmapView;
