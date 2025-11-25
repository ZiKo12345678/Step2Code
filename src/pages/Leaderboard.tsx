import { Link } from "react-router-dom";
import { Code2, Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeaderboard } from "@/hooks/useProfile";

const Leaderboard = () => {
  const { data: users, isLoading } = useLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-muted-foreground font-semibold">{rank}</span>;
    }
  };

  const topUsers = users?.slice(0, 3) || [];
  const otherUsers = users?.slice(3) || [];

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
              <Link to="/leaderboard" className="text-sm text-foreground font-medium">
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Лидерборд</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Лучшие разработчики на платформе
          </p>
        </div>

        <Tabs defaultValue="all" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">Все время</TabsTrigger>
            <TabsTrigger value="month">Месяц</TabsTrigger>
            <TabsTrigger value="week">Неделя</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {isLoading ? (
              <p className="text-center text-muted-foreground">Загрузка...</p>
            ) : (
              <>
                {/* Top 3 */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {topUsers.map((user, index) => (
                    <Card
                      key={user.id}
                      className={`p-6 text-center ${
                        index === 0
                          ? "border-yellow-400 bg-gradient-to-br from-yellow-400/10 to-transparent"
                          : index === 1
                          ? "border-gray-300 bg-gradient-to-br from-gray-300/10 to-transparent"
                          : "border-amber-600 bg-gradient-to-br from-amber-600/10 to-transparent"
                      }`}
                    >
                      <div className="flex justify-center mb-4">
                        {getRankIcon(index + 1)}
                      </div>
                      <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-primary">
                        <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                          {user.username?.substring(0, 2).toUpperCase() || "US"}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg mb-2">{user.username || "Пользователь"}</h3>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Trophy className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-bold">{user.total_points}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span>Streak: {user.streak} дней</span>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Rest of leaderboard */}
                <div className="space-y-3">
                  {otherUsers.map((user, index) => (
                    <Card
                      key={user.id}
                      className="p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 text-center">
                          {getRankIcon(index + 4)}
                        </div>
                        <Avatar className="w-12 h-12 border-2 border-primary">
                          <AvatarFallback className="font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                            {user.username?.substring(0, 2).toUpperCase() || "US"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{user.username || "Пользователь"}</p>
                          <p className="text-sm text-muted-foreground">
                            Streak: {user.streak} дней
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-primary" />
                          <span className="font-bold text-lg">{user.total_points}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {!isLoading && (!users || users.length === 0) && (
                  <p className="text-center text-muted-foreground">
                    Лидерборд пока пуст
                  </p>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="month">
            <p className="text-center text-muted-foreground py-12">
              Статистика за месяц скоро появится
            </p>
          </TabsContent>

          <TabsContent value="week">
            <p className="text-center text-muted-foreground py-12">
              Статистика за неделю скоро появится
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
