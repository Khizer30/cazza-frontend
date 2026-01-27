import { Calendar, CreditCard, FileEdit, HelpCircle, LogOut, Menu, Moon, Settings, Sun, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { NotificationBell } from "./ClientComponents/NotificationBell";
import { useTheme } from "./theme-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

import logoBlack from "@/assets/imgs/logoBlack.png";
import logoWhite from "@/assets/imgs/logoWhite.png";
import { useauth } from "@/hooks/useauth";
import { useUserStore } from "@/store/userStore";

interface HeaderProps {
  onToggleSidebar?: () => void;
}
export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { logout } = useauth();
  const { user } = useUserStore();

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "U";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    if (lastName) {
      return lastName.charAt(0).toUpperCase();
    }
    return "U";
  };
  return (
    <header className="h-16 bg-card border-b border-border/50 flex items-center justify-between px-6">
      {/* Logo and Welcome Message */}
      <div className="flex items-center gap-6">
        {/* Mobile Menu Button */}
        {onToggleSidebar && (
          <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="lg:hidden h-10 w-10 p-0">
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/dashboard")}
        >
          {/* <Logo size="md" /> */}
          <img src={logoWhite} alt="Cazza" className="w-[120px] hidden dark:block" />
          <img src={logoBlack} alt="Cazza" className="w-[120px] block dark:hidden" />
        </div>
      </div>

      {/* Right side elements */}
      <div className="flex items-center gap-4">
        {/* Book a Call Button - Only for Accountant Portal */}
        {location.pathname.startsWith("/accountant") && (
          <Button
            onClick={() => window.open("https://calendly.com/your-calendar-link", "_blank")}
            className="bg-primary hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book a Call
          </Button>
        )}

        <NotificationBell />

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user?.profileImage || undefined}
                  alt={`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User avatar"}
                />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 bg-background border shadow-lg z-50" align="end" forceMount>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/billing")}>
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/support")}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/teams")}>
              <Users className="mr-2 h-4 w-4" />
              Teams
            </DropdownMenuItem>

            {user?.role === "SUPERADMIN" && (
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/manage-blogs")}>
                <FileEdit className="mr-2 h-4 w-4" />
                Manage Blogs
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            {/* Theme Toggle */}
            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Light Mode
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* Sign Out with Confirmation Dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                  onSelect={(e) => e.preventDefault()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will need to sign in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => logout()} className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
                    Sign Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
