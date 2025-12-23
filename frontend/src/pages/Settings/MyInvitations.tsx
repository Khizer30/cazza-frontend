import { useEffect, useState } from "react";
import { useTeam } from "@/hooks/useTeam";
import { getMyInvitationsService } from "@/services/teamService";
import { useToast } from "@/components/ToastProvider";
import { SettingsSidebar } from "@/components/SettingsSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import type { TeamInvitation } from "@/types/auth";
import { AxiosError } from "axios";

export const MyInvitations = () => {
  const { acceptInvitation, isLoading } = useTeam();
  const { showToast } = useToast();
  const [myInvitations, setMyInvitations] = useState<TeamInvitation[]>([]);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setLoading(true);
        const res = await getMyInvitationsService();
        if (res && res.success) {
          setMyInvitations(res.data || []);
        } else {
          showToast(res.message || "Failed to fetch invitations", "error");
        }
      } catch (error: unknown) {
        console.error("Get my invitations error:", error);
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to fetch invitations";
          showToast(errorMessage, "error");
        } else if (error instanceof Error) {
          showToast(error.message, "error");
        } else {
          showToast("An unexpected error occurred. Please try again.", "error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, [showToast]);

  const handleAccept = async (invitationId: string) => {
    setAcceptingId(invitationId);
    let successResult = null;
    try {
      successResult = await acceptInvitation(invitationId);
      const res = await getMyInvitationsService();
      if (res && res.success) {
        setMyInvitations(res.data || []);
      }
    } catch (error) {
      console.error("Failed to accept invitation:", error);
    } finally {
      setAcceptingId(null);
      if (successResult && successResult.success) {
        showToast(
          successResult.message || "Invitation accepted successfully",
          "success"
        );
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <SettingsSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl space-y-6 mx-auto my-4 p-4 md:p-6">
          <Card>
            <CardHeader>
              <CardTitle>My Invitations</CardTitle>
              <CardDescription>
                Accept or decline team invitations sent to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : myInvitations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending invitations</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myInvitations.map((invitation) => {
                    const expiresAt = invitation.expiresAt
                      ? new Date(invitation.expiresAt)
                      : null;
                    const isExpired = expiresAt
                      ? expiresAt < new Date()
                      : false;

                    return (
                      <div
                        key={invitation.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {invitation.teamOwner?.firstName?.[0] ||
                                invitation.sender?.firstName?.[0] ||
                                "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {invitation.teamOwner?.firstName}{" "}
                                {invitation.teamOwner?.lastName}
                                {invitation.sender?.firstName &&
                                  !invitation.teamOwner && (
                                    <>
                                      {invitation.sender.firstName}{" "}
                                      {invitation.sender.lastName}
                                    </>
                                  )}
                              </h3>
                              <Badge
                                variant="outline"
                                className="capitalize text-xs"
                              >
                                {invitation.role?.toLowerCase() || "member"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Invited you to join their team
                            </p>
                            {expiresAt && (
                              <p
                                className={`text-xs mt-1 ${
                                  isExpired
                                    ? "text-destructive font-medium"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {isExpired
                                  ? "Expired"
                                  : `Expires ${expiresAt.toLocaleDateString()}`}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {isExpired ? (
                            <Badge variant="destructive">Expired</Badge>
                          ) : (
                            <Button
                              onClick={() => handleAccept(invitation.id)}
                              disabled={
                                isLoading || acceptingId === invitation.id
                              }
                              className="gap-2"
                            >
                              {acceptingId === invitation.id ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Accepting...
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="h-4 w-4" />
                                  Accept
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
