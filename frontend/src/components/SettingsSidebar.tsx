import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  CreditCard,
  HelpCircle,
  Users,
  Menu,
  X,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { usePendingInvitations } from "@/hooks/usePendingInvitations";

interface SettingsSidebarProps {
  className?: string;
}

export const SettingsSidebar = ({ className }: SettingsSidebarProps) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pendingInvitationsCount = usePendingInvitations();

  const menuItems = [
    {
      title: "Account Settings",
      path: "/client/settings",
      icon: Settings,
    },
    {
      title: "Billing",
      path: "/client/billing",
      icon: CreditCard,
    },
    {
      title: "Support",
      path: "/client/support",
      icon: HelpCircle,
    },
    {
      title: "Teams",
      path: "/client/teams",
      icon: Users,
    },
    {
      title: "My Invitations",
      path: "/client/invitations",
      icon: Mail,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 border-b border-border bg-card">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="gap-2"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span>Settings Menu</span>
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "w-64 border-r border-border bg-card flex-col",
          "fixed md:relative top-16 md:top-0 left-0 bottom-0 z-50 md:z-auto",
          "transform transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:flex",
          className
        )}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Settings</h2>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
                {item.path === "/client/invitations" &&
                  pendingInvitationsCount > 0 && (
                    <Badge
                      variant="destructive"
                      className={cn(
                        "h-5 min-w-5 px-1.5 text-xs flex items-center justify-center",
                        isActive &&
                          "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                      )}
                    >
                      {pendingInvitationsCount}
                    </Badge>
                  )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
