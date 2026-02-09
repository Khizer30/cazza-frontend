import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

import { Logo } from "@/assets/svgs/Logo";
import { NavBar } from "@/components/ClientComponents/NavBar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/userStore";

export const BlogLayout = () => {
  const { user } = useUserStore();
  const { checkLoggedIn } = useUser();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        await checkLoggedIn();
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="h-screen flex flex-col bg-sidebar-accent overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="flex flex-1 min-h-0">
          <div className="hidden lg:block h-full">
            <NavBar />
          </div>

          <div
            className={`lg:hidden fixed inset-y-0 left-0 z-50 bg-card border-r border-border transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <NavBar onNavigate={toggleSidebar} />
          </div>

          {isSidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar} />}

          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Logo size="md" />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button type="button" onClick={() => navigate("/", { state: { scrollTo: "solution" } })} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0 font-inherit">
                Solution
              </button>
              <button type="button" onClick={() => navigate("/", { state: { scrollTo: "platforms" } })} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0 font-inherit">
                Integrations
              </button>
              <Link to="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <button type="button" onClick={() => navigate("/", { state: { scrollTo: "pricing" } })} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0 font-inherit">
                Pricing
              </button>
              <button type="button" onClick={() => navigate("/", { state: { scrollTo: "faq" } })} className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0 font-inherit">
                FAQ
              </button>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
