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
import { useNavigate } from "react-router-dom";
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
import { useTheme } from "./theme-provider";
interface HeaderProps {
  onToggleSidebar?: () => void;
}
export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
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

        {/* Notification Bell */}
        {/* <NotificationBell
          onNotificationClick={(notification) => {
            // Navigate to the specific channel and message
            console.log("Navigate to notification:", notification);
          }}
        /> */}

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={"avatarUrl"} alt="User avatar" />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  S
                </AvatarFallback>
              </Avatar>
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
              onClick={() => navigate("teams")}
            >
              <Users className="mr-2 h-4 w-4" />
              Teams
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

            {/* Sign Out */}
            <DropdownMenuItem
              className="cursor-pointer text-red-600"
              //   onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
