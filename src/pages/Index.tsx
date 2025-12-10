import { Link } from "react-router-dom";
import { Code2, Trophy, Target, Zap, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRoadmaps } from "@/hooks/useRoadmaps";
import { Header } from "@/components/Header";

const Index = () => {
  const { data: roadmaps, isLoading } = useRoadmaps();

  const colors = [
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
  ];

  const icons = ["💻", "⚙️", "🚀", "🔧"];

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Структурированное обучение",
      description: "Пошаговые roadmaps для каждой технологии",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Практические задачи",
      description: "Решайте задачи прямо в браузере",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Геймификация",
      description: "Зарабатывайте баллы и достижения",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Отслеживание прогресса",
      description: "Визуализация вашего пути обучения",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent-foreground">Интерактивная платформа обучения</span>
          </div>
          <h1 className="text-6xl font-bold mb-6">
            Ваш путь к<br />
            <span className="gradient-text">мастерству в коде</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Структурированные roadmaps, практические задачи и геймификация. 
            Начните свой путь в программировании прямо сейчас.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-lg">
              Выбрать Roadmap
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 card-hover bg-card border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Roadmaps Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Популярные Roadmaps</h2>
            <p className="text-muted-foreground">Выберите направление и начните обучение</p>
          </div>
          <Button variant="outline">
            Все roadmaps
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <p className="text-center text-muted-foreground col-span-full">Загрузка...</p>
          ) : roadmaps && roadmaps.length > 0 ? (
            roadmaps.slice(0, 2).map((roadmap, index) => (
              <Link key={roadmap.id} to={`/roadmap/${roadmap.id}`}>
                <Card className="p-6 card-hover bg-card border-border group">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{icons[index % icons.length]}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {roadmap.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {roadmap.description || "Продолжите обучение"}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-full">
              Нет доступных roadmaps
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
          <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам разработчиков, которые уже улучшают свои навыки с Step2Code
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-lg">
            Начать бесплатно
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-semibold">Step2Code</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Step2Code. Создано с ❤️ для разработчиков
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
