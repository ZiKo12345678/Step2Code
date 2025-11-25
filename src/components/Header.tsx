import { Link } from "react-router-dom";
import { Code2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  currentPath?: string;
}

export const Header = ({ currentPath }: HeaderProps) => {
  const { user, signOut } = useAuth();

  return (
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
              className={`text-sm ${
                currentPath === "roadmaps"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              } transition-colors`}
            >
              Roadmaps
            </Link>
            <Link
              to="/leaderboard"
              className={`text-sm ${
                currentPath === "leaderboard"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              } transition-colors`}
            >
              Лидерборд
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                        {user.email?.substring(0, 2).toUpperCase() || "US"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      Профиль
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="default" className="bg-gradient-to-r from-primary to-accent">
                  Войти
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
