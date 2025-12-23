import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";

interface TeamInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInviteSuccess?: () => void;
}

export const TeamInviteDialog = ({
  open,
  onOpenChange,
  onInviteSuccess,
}: TeamInviteDialogProps) => {
  const { inviteTeamMember, isLoading } = useUser();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"MEMBER" | "ADMIN">("MEMBER");
  const [errors, setErrors] = useState<{ email?: string; role?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validate email
    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(email.trim())) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    if (!role) {
      setErrors({ role: "Please select a role" });
      return;
    }

    try {
      await inviteTeamMember({
        email: email.trim().toLowerCase(),
        role,
      });

      // Reset form and close dialog on success
      setEmail("");
      setRole("MEMBER");
      setErrors({});
      onOpenChange(false);

      // Call success callback if provided
      if (onInviteSuccess) {
        onInviteSuccess();
      }
    } catch (error) {
      // Error is already handled in the hook
      console.error("Invite error:", error);
    }
  };

  const handleClose = () => {
    setEmail("");
    setRole("MEMBER");
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to add a new member to your team. They will
            receive an email with instructions to join.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
                className={errors.email ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={role}
                onValueChange={(value: "MEMBER" | "ADMIN") => {
                  setRole(value);
                  if (errors.role) {
                    setErrors({ ...errors, role: undefined });
                  }
                }}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full" id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MEMBER">Member</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Members have standard access. Admins can manage team members and
                settings.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invitation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
