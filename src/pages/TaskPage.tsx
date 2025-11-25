import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Code2, Play, CheckCircle, XCircle, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaskInstance } from "@/hooks/useTasks";
import { useSubmitSolution } from "@/hooks/useTasks";
import { supabase } from "@/integrations/supabase/client";

const TaskPage = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState<string>();
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState<any[]>([]);
  const [aiResult, setAiResult] = useState<{ status: string; reason: string; earnedPoints?: number } | null>(null);
  const [isAiChecking, setIsAiChecking] = useState(false);

  const { data: taskInstance, isLoading } = useTaskInstance(id);
  const submitSolution = useSubmitSolution();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  useEffect(() => {
    if (taskInstance?.task_templates?.starter_code) {
      setCode(taskInstance.task_templates.starter_code);
    }
  }, [taskInstance]);

  const handleRunCode = async () => {
    if (!userId || !id) return;

    const result = await submitSolution.mutateAsync({
      userId,
      taskInstanceId: id,
      code,
      language: "javascript",
    });

    if (result.tests) {
      setTestResults(result.tests);
    }
  };

  const handleAiJudge = async () => {
    if (!userId || !id) return;
    
    setIsAiChecking(true);
    setAiResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-judge', {
        body: {
          code,
          taskInstanceId: id,
          userId,
        },
      });

      if (error) throw error;

      setAiResult(data);
    } catch (error) {
      console.error('AI Judge error:', error);
      setAiResult({
        status: 'incorrect',
        reason: 'Ошибка при проверке через AI',
      });
    } finally {
      setIsAiChecking(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-success/10 text-success border-success/20";
      case "Medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "Hard":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!taskInstance || !taskInstance.task_templates) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Задача не найдена</p>
      </div>
    );
  }

  const task = taskInstance.task_templates;

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

      <div className="h-[calc(100vh-73px)] flex">
        {/* Left Panel - Task Description */}
        <div className="w-1/2 border-r border-border overflow-y-auto">
          <div className="p-6">
            <div className="mb-4">
              <Link
                to={`/roadmap/${taskInstance.step_id}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Назад к roadmap
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold">{task.title}</h1>
              <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {task.difficulty === "Easy" ? "1" : task.difficulty === "Medium" ? "2" : "3"}{" "}
                  балла
                </span>
              </div>
            </div>

            <Tabs defaultValue="description" className="mb-6">
              <TabsList>
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="tests">Тесты</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6 mt-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Задача</h3>
                  <p className="text-muted-foreground">{task.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="tests" className="mt-4">
                <div className="space-y-3">
                  {testResults.length > 0 ? (
                    testResults.map((test, index) => (
                      <Card
                        key={index}
                        className={`p-4 ${
                          test.passed
                            ? "border-success bg-success/5"
                            : "border-destructive bg-destructive/5"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {test.passed ? (
                            <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium mb-1">
                              Тест {index + 1}: {test.passed ? "Пройден" : "Провален"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Вход: {JSON.stringify(test.input)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Ожидалось: {JSON.stringify(test.expected)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Получено: {JSON.stringify(test.actual || test.error)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Запустите код, чтобы увидеть результаты тестов
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span className="font-medium">JavaScript</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleRunCode}
                disabled={submitSolution.isPending}
                className="gap-2"
                variant="outline"
              >
                <Play className="w-4 h-4" />
                {submitSolution.isPending ? "Проверка..." : "Запустить"}
              </Button>
              <Button
                onClick={handleAiJudge}
                disabled={isAiChecking}
                className="gap-2"
              >
                <Trophy className="w-4 h-4" />
                {isAiChecking ? "AI проверяет..." : "Submit with AI"}
              </Button>
            </div>
          </div>

          {aiResult && (
            <div className={`p-4 border-b border-border ${
              aiResult.status === 'correct' 
                ? 'border-success/20 bg-success/5' 
                : 'border-destructive/20 bg-destructive/5'
            }`}>
              <div className="flex items-start gap-3">
                {aiResult.status === 'correct' ? (
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">
                    {aiResult.status === 'correct' ? 'Решение принято! ✅' : 'Решение неверное ❌'}
                  </h4>
                  <p className="text-sm text-muted-foreground">{aiResult.reason}</p>
                  {aiResult.earnedPoints && aiResult.earnedPoints > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">+{aiResult.earnedPoints} баллов</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full resize-none font-mono text-sm p-4 border-0 focus-visible:ring-0"
              placeholder="Введите ваше решение здесь..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
