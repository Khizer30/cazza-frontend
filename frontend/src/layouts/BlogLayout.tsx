import { Logo } from "@/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/ClientComponents/NavBar";
import { getToken } from "@/utils/localStorage";
import { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

export const BlogLayout = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (token) {
    return (
      <div className="min-h-screen flex flex-col bg-sidebar-accent">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden lg:block">
            <NavBar />
          </div>

          <div
            className={`lg:hidden fixed inset-y-0 left-0 z-50 bg-card border-r border-border transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <NavBar onNavigate={toggleSidebar} />
          </div>

          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={toggleSidebar}
            />
          )}

          <div className="flex-1 overflow-hidden">
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
              <Link
                to="/#solution"
                className="text-foreground hover:text-primary transition-colors"
              >
                Solution
              </Link>
              <Link
                to="/#platforms"
                className="text-foreground hover:text-primary transition-colors"
              >
                Integrations
              </Link>
              <Link
                to="/blog"
                className="text-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/#pricing"
                className="text-foreground hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/#faq"
                className="text-foreground hover:text-primary transition-colors"
              >
                FAQ
              </Link>
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

