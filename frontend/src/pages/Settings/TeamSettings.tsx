import { useCallback, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Shield, Users } from "lucide-react";

const roles = [
  {
    name: "Owner",
    description:
      "Full access to all features including billing, integrations, and team management",
    permissions: [
      "All permissions",
      "Manage billing",
      "Manage integrations",
      "Manage team",
      "Full access",
    ],
    icon: "owner",
  },
  {
    name: "Admin",
    description:
      "Manage team members, integrations, and settings, but cannot access billing",
    permissions: [
      "Manage team",
      "Manage integrations",
      "View reports",
      "Manage settings",
      "Connect stores",
    ],
    icon: "admin",
  },
  {
    name: "Member",
    description:
      "Standard access to core features, cannot manage billing or integrations",
    permissions: [
      "View reports",
      "View data",
      "Basic settings",
      "Use features",
    ],
    icon: "member",
  },
];
export const TeamSettings = () => {
  // Dummy current user (owner)
  const user = { id: "user-0", name: "Workspace Owner" };

  // Minimal dummy members
  const [teamMembers] = useState([
    {
      id: "member-1",
      user_id: "user-1",
      name: "Alice Turner",
      profiles: { email: "alice@example.com" },
      role: "admin",
      joined_at: new Date().toISOString(),
    },
    {
      id: "member-2",
      user_id: "user-2",
      name: "Bob Mason",
      profiles: { email: "bob@example.com" },
      role: "member",
      joined_at: new Date().toISOString(),
    },
  ]);

  // No pending invitations by default
  const [invitations] = useState<any[]>([]);

  const canManageTeam = true;
  const isOrgOwner = true;

  // Empty placeholder handlers per request
  const handleInvite = useCallback(() => {
    // TODO: implement invite flow
  }, []);

  const handleRemoveMember = useCallback((id: string) => {
    // TODO: implement remove member
    console.log("Remove member (placeholder):", id);
  }, []);

  const getInitials = (m: any) =>
    m.name
      ? m.name
          .split(" ")
          .map((s: string) => s[0])
          .slice(0, 2)
          .join("")
      : (m.profiles?.email?.[0] || "?").toUpperCase();
  const getDisplayName = (m: any) => m.name || m.profiles?.email || "Unknown";

  return (
    <div className="max-w-6xl space-y-6 mx-auto my-4">
      {/* Team overview  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="px-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Team Members</h3>
            </div>
            <p className="text-3xl font-bold">
              {/* {teamMembers.filter((m) => m.user_id !== user?.id).length} */}
              5
            </p>
            <p className="text-sm text-muted-foreground">
              {/* {
                teamMembers.filter(
                  (m) => m.status === "active" && m.user_id !== user?.id
                ).length
              }{" "} */}
              2 active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Pending Invites</h3>
            </div>
            <p className="text-3xl font-bold">{invitations.length}</p>
            <p className="text-sm text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Admins</h3>
            </div>
            <p className="text-3xl font-bold">
              {/* {
                teamMembers.filter(
                  (m) => m.role === "admin" && m.user_id !== user?.id
                ).length
              } */}
              2
            </p>
            <p className="text-sm text-muted-foreground">Admin privileges</p>
          </CardContent>
        </Card>
      </div>

      {/*Manage Team Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their access permissions
              </CardDescription>
            </div>

            {canManageTeam && (
              <Button className="gap-2" onClick={handleInvite}>
                Invite Member
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Active Members - Filter out current user */}
            {teamMembers
              .filter((member) => member.user_id !== user?.id)
              .map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(member)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {getDisplayName(member)}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {member.profiles?.email || "No email"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Joined {new Date(member.joined_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="capitalize">
                      {member.role}
                    </Badge>
                    {canManageTeam && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-destructive"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}

            {/* Pending Invitations */}
            {invitations.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No pending invitations
              </div>
            ) : (
              invitations.map((invitation: any) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {invitation.email?.[0]?.toUpperCase() ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{invitation.email}</h3>
                      <p className="text-sm text-muted-foreground">
                        Pending invitation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="capitalize">
                      {invitation.role}
                    </Badge>
                  </div>
                </div>
              ))
            )}

            {teamMembers.filter((m) => m.user_id !== user?.id).length === 0 &&
              invitations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No team members yet. Invite your first member to get started!
                </div>
              )}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Overview of what each role can do in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.name} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {role.icon}
                  <h3 className="font-semibold">{role.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {role.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <Badge
                      key={permission}
                      variant="outline"
                      className="text-xs"
                    >
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
