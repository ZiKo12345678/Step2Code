import { Link } from "react-router-dom";
import { Code2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRoadmaps } from "@/hooks/useRoadmaps";
import { useState } from "react";

const Roadmaps = () => {
  const { data: roadmapsData, isLoading } = useRoadmaps();
  const [searchQuery, setSearchQuery] = useState("");

  const colors = [
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-purple-500",
  ];

  const icons = ["💻", "⚙️", "🚀", "🔧", "📱", "📊"];

  const filteredRoadmaps = roadmapsData?.filter((roadmap) =>
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    roadmap.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Лидерборд
              </Link>
              <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Профиль
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Выберите свой <span className="gradient-text">путь</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Структурированные roadmaps для изучения технологий с нуля
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Поиск roadmaps..."
              className="pl-10 bg-card border-border"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Фильтры
          </Button>
        </div>

        {/* Roadmaps Grid */}
        {isLoading ? (
          <p className="text-center text-muted-foreground">Загрузка...</p>
        ) : filteredRoadmaps && filteredRoadmaps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmaps.map((roadmap, index) => (
              <Link key={roadmap.id} to={`/roadmap/${roadmap.id}`}>
                <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-card border-border h-full">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                      colors[index % colors.length]
                    } flex items-center justify-center text-3xl mb-4`}
                  >
                    {icons[index % icons.length]}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{roadmap.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {roadmap.description || "Освойте новые навыки"}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            {searchQuery ? "Roadmaps не найдены" : "Roadmaps пока не добавлены"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Roadmaps;
