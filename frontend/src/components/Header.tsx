import { Button } from "./ui/button";
import {
  Calendar,
  CreditCard,
  HelpCircle,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logoWhite from "@/assets/imgs/logoWhite.png";
import logoBlack from "@/assets/imgs/logoBlack.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
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
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useauth } from "@/hooks/useauth";
import { useUserStore } from "@/store/userStore";
import { useTeamStore } from "@/store/teamStore";
import { usePendingInvitations } from "@/hooks/usePendingInvitations";
import { getMyInvitationsService } from "@/services/teamService";
import { useEffect } from "react";
import type { TeamInvitation } from "@/types/auth";

interface HeaderProps {
  onToggleSidebar?: () => void;
}
export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { logout } = useauth();
  const { user } = useUserStore();
  const pendingInvitationsCount = usePendingInvitations();
  const invitationsRefreshTrigger = useTeamStore((state) => state.invitationsRefreshTrigger);
  const setPendingInvitationsCount = useTeamStore((state) => state.setPendingInvitationsCount);

  useEffect(() => {
    const fetchPendingInvitations = async () => {
      try {
        const res = await getMyInvitationsService();
        if (res && res.success && res.data) {
          const invitations = res.data as TeamInvitation[];
          const pendingCount = invitations.filter((invitation) => {
            if (invitation.status && invitation.status.toUpperCase() === "ACCEPTED") {
              return false;
            }
            if (invitation.expiresAt) {
              const expiresAt = new Date(invitation.expiresAt);
              return expiresAt >= new Date();
            }
            return true;
          }).length;
          setPendingInvitationsCount(pendingCount);
        }
      } catch (error) {
        console.error("Failed to fetch pending invitations:", error);
      }
    };

    fetchPendingInvitations();
    const interval = setInterval(fetchPendingInvitations, 30000);
    return () => clearInterval(interval);
  }, [location.pathname, invitationsRefreshTrigger]);

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
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden h-10 w-10 p-0"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/client/dashboard")}
        >
          {/* <Logo size="md" /> */}
          <img
            src={logoWhite}
            alt="Cazza"
            className="w-[120px] hidden dark:block"
          />
          <img
            src={logoBlack}
            alt="Cazza"
            className="w-[120px] block dark:hidden"
          />
        </div>
      </div>

      {/* Right side elements */}
      <div className="flex items-center gap-4">
        {/* Book a Call Button - Only for Accountant Portal */}
        {location.pathname.startsWith("/accountant") && (
          <Button
            onClick={() =>
              window.open("https://calendly.com/your-calendar-link", "_blank")
            }
            className="bg-primary hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book a Call
          </Button>
        )}

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user?.profileImage || undefined}
                  alt={
                    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
                    "User avatar"
                  }
                />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              {pendingInvitationsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 min-w-5 px-1.5 text-xs flex items-center justify-center rounded-full"
                >
                  {pendingInvitationsCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 bg-background border shadow-lg z-50"
            align="end"
            forceMount
          >
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/client/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/client/billing")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/client/support")}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/client/teams")}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Teams
                </div>
                {pendingInvitationsCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="h-5 min-w-5 px-1.5 text-xs flex items-center justify-center ml-2"
                  >
                    {pendingInvitationsCount}
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Theme Toggle */}
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
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
                  <AlertDialogTitle>
                    Are you sure you want to sign out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You will need to sign in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                  >
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
