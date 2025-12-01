import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Hash,
  Users,
  Settings,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  Search,
  MessageSquare,
  ShoppingBag,
  Package,
  Smartphone,
  Calculator,
  BarChart3,
  TrendingUp,
  DollarSign,
  Zap,
  Heart,
  Star,
  Target,
  Briefcase,
  Home,
  Building2,
  Rocket,
  Globe,
  Music,
  Camera,
  Gamepad2,
  Book,
  Code,
  Palette,
  X,
  Send,
  type LucideIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Types
interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "MEMBER" | "ADMIN";
}

interface ChannelMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
}

interface Channel {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconName: string;
  color: string;
  members: TeamMember[];
  createdAt: string;
  messages: ChannelMessage[];
}

// Available icons for channels
const availableIcons: { name: string; icon: LucideIcon; color: string }[] = [
  { name: "Hash", icon: Hash, color: "hsl(var(--primary))" },
  { name: "MessageSquare", icon: MessageSquare, color: "hsl(var(--chart-1))" },
  { name: "ShoppingBag", icon: ShoppingBag, color: "hsl(var(--chart-4))" },
  { name: "Package", icon: Package, color: "hsl(var(--chart-5))" },
  { name: "Smartphone", icon: Smartphone, color: "hsl(var(--destructive))" },
  { name: "Calculator", icon: Calculator, color: "hsl(var(--chart-1))" },
  { name: "BarChart3", icon: BarChart3, color: "hsl(var(--chart-2))" },
  { name: "TrendingUp", icon: TrendingUp, color: "hsl(var(--chart-3))" },
  { name: "DollarSign", icon: DollarSign, color: "hsl(var(--success))" },
  { name: "Zap", icon: Zap, color: "hsl(var(--warning))" },
  { name: "Heart", icon: Heart, color: "hsl(var(--destructive))" },
  { name: "Star", icon: Star, color: "hsl(var(--chart-4))" },
  { name: "Target", icon: Target, color: "hsl(var(--chart-5))" },
  { name: "Briefcase", icon: Briefcase, color: "hsl(var(--chart-1))" },
  { name: "Home", icon: Home, color: "hsl(var(--chart-2))" },
  { name: "Building2", icon: Building2, color: "hsl(var(--chart-3))" },
  { name: "Rocket", icon: Rocket, color: "hsl(var(--primary))" },
  { name: "Globe", icon: Globe, color: "hsl(var(--chart-4))" },
  { name: "Music", icon: Music, color: "hsl(var(--chart-5))" },
  { name: "Camera", icon: Camera, color: "hsl(var(--destructive))" },
  { name: "Gamepad2", icon: Gamepad2, color: "hsl(var(--chart-1))" },
  { name: "Book", icon: Book, color: "hsl(var(--chart-2))" },
  { name: "Code", icon: Code, color: "hsl(var(--chart-3))" },
  { name: "Palette", icon: Palette, color: "hsl(var(--chart-4))" },
];

// Dummy team members
const dummyTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "ADMIN",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "MEMBER",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "MEMBER",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "MEMBER",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "MEMBER",
  },
];

// Dummy messages
const dummyMessages: ChannelMessage[] = [
  {
    id: "1",
    channelId: "1",
    senderId: "1",
    senderName: "John Doe",
    content: "Hey team! Welcome to the General channel. Let's keep everyone updated here.",
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
  {
    id: "2",
    channelId: "1",
    senderId: "2",
    senderName: "Jane Smith",
    content: "Thanks John! Excited to be part of the team.",
    timestamp: new Date(Date.now() - 86400000 * 2 + 3600000), // 2 days ago + 1 hour
  },
  {
    id: "3",
    channelId: "2",
    senderId: "1",
    senderName: "John Doe",
    content: "Great work on the sales numbers this quarter!",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: "4",
    channelId: "2",
    senderId: "3",
    senderName: "Mike Johnson",
    content: "Thank you! The team really pulled together on this one.",
    timestamp: new Date(Date.now() - 86400000 + 1800000), // 1 day ago + 30 min
  },
  {
    id: "5",
    channelId: "3",
    senderId: "1",
    senderName: "John Doe",
    content: "Let's discuss the new marketing campaign strategy.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
];

// Initial dummy channels with messages
const initialChannels: Channel[] = [
  {
    id: "1",
    name: "General",
    description: "General discussions and announcements",
    icon: Hash,
    iconName: "Hash",
    color: "hsl(var(--primary))",
    members: [dummyTeamMembers[0], dummyTeamMembers[1]],
    createdAt: new Date().toISOString(),
    messages: dummyMessages.filter((m) => m.channelId === "1"),
  },
  {
    id: "2",
    name: "Sales Team",
    description: "Sales updates and strategies",
    icon: TrendingUp,
    iconName: "TrendingUp",
    color: "hsl(var(--chart-3))",
    members: [dummyTeamMembers[0], dummyTeamMembers[2], dummyTeamMembers[3]],
    createdAt: new Date().toISOString(),
    messages: dummyMessages.filter((m) => m.channelId === "2"),
  },
  {
    id: "3",
    name: "Marketing",
    description: "Marketing campaigns and content",
    icon: Target,
    iconName: "Target",
    color: "hsl(var(--chart-5))",
    members: [dummyTeamMembers[1], dummyTeamMembers[4]],
    createdAt: new Date().toISOString(),
    messages: dummyMessages.filter((m) => m.channelId === "3"),
  },
];

export const Channels = () => {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    channels[0]?.id || null
  );
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = dummyTeamMembers[0]; // Current user is John Doe

  // Form state for create/edit
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<{
    name: string;
    icon: LucideIcon;
    color: string;
  }>(availableIcons[0]);

  const selectedChannel = channels.find((c) => c.id === selectedChannelId);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChannel?.messages]);

  // Filter channels based on search
  const filteredChannels = channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateChannel = () => {
    if (!channelName.trim()) return;

    const newChannel: Channel = {
      id: Date.now().toString(),
      name: channelName,
      description: channelDescription,
      icon: selectedIcon.icon,
      iconName: selectedIcon.name,
      color: selectedIcon.color,
      members: [],
      createdAt: new Date().toISOString(),
      messages: [],
    };

    setChannels([...channels, newChannel]);
    setChannelName("");
    setChannelDescription("");
    setSelectedIcon(availableIcons[0]);
    setShowCreateDialog(false);
    setSelectedChannelId(newChannel.id);
  };

  const handleEditChannel = () => {
    if (!editingChannel || !channelName.trim()) return;

    setChannels(
      channels.map((channel) =>
        channel.id === editingChannel.id
          ? {
              ...channel,
              name: channelName,
              description: channelDescription,
              icon: selectedIcon.icon,
              iconName: selectedIcon.name,
              color: selectedIcon.color,
            }
          : channel
      )
    );

    setEditingChannel(null);
    setChannelName("");
    setChannelDescription("");
    setSelectedIcon(availableIcons[0]);
  };

  const handleDeleteChannel = (channelId: string) => {
    setChannels(channels.filter((channel) => channel.id !== channelId));
    if (selectedChannelId === channelId) {
      setSelectedChannelId(channels.find((c) => c.id !== channelId)?.id || null);
    }
  };

  const handleAddMember = (channelId: string, memberId: string) => {
    const member = dummyTeamMembers.find((m) => m.id === memberId);
    if (!member) return;

    setChannels(
      channels.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              members: channel.members.some((m) => m.id === memberId)
                ? channel.members
                : [...channel.members, member],
            }
          : channel
      )
    );
    setShowAddMemberDialog(null);
  };

  const handleRemoveMember = (channelId: string, memberId: string) => {
    setChannels(
      channels.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              members: channel.members.filter((m) => m.id !== memberId),
            }
          : channel
      )
    );
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChannelId) return;

    const newMessage: ChannelMessage = {
      id: Date.now().toString(),
      channelId: selectedChannelId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: messageInput.trim(),
      timestamp: new Date(),
    };

    setChannels(
      channels.map((channel) =>
        channel.id === selectedChannelId
          ? {
              ...channel,
              messages: [...channel.messages, newMessage],
            }
          : channel
      )
    );

    setMessageInput("");
  };

  const openEditDialog = (channel: Channel) => {
    setEditingChannel(channel);
    setChannelName(channel.name);
    setChannelDescription(channel.description);
    const icon = availableIcons.find((i) => i.name === channel.iconName);
    if (icon) setSelectedIcon(icon);
    setShowCreateDialog(true);
  };

  const closeDialog = () => {
    setShowCreateDialog(false);
    setEditingChannel(null);
    setChannelName("");
    setChannelDescription("");
    setSelectedIcon(availableIcons[0]);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getSender = (senderId: string) => {
    return dummyTeamMembers.find((m) => m.id === senderId) || dummyTeamMembers[0];
  };

  const formatMessageTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Sidebar - Channels List */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Channels</h2>
            <Dialog open={showCreateDialog} onOpenChange={closeDialog}>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowCreateDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingChannel ? "Edit Channel" : "Create New Channel"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingChannel
                      ? "Update your channel details and icon"
                      : "Create a new channel for your team to collaborate"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Channel Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Sales Team"
                      value={channelName}
                      onChange={(e) => setChannelName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="What is this channel about?"
                      value={channelDescription}
                      onChange={(e) => setChannelDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Channel Icon</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          type="button"
                        >
                          {(() => {
                            const IconComponent = selectedIcon.icon;
                            return (
                              <IconComponent
                                className="mr-2 h-4 w-4"
                                style={{ color: selectedIcon.color }}
                              />
                            );
                          })()}
                          {selectedIcon.name}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid grid-cols-4 gap-2">
                          {availableIcons.map((iconOption) => {
                            const IconComponent = iconOption.icon;
                            return (
                              <button
                                key={iconOption.name}
                                type="button"
                                onClick={() => setSelectedIcon(iconOption)}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all hover:bg-muted ${
                                  selectedIcon.name === iconOption.name
                                    ? "border-primary bg-primary/10"
                                    : "border-border"
                                }`}
                              >
                                <IconComponent
                                  className="h-6 w-6 mb-1"
                                  style={{ color: iconOption.color }}
                                />
                                <span className="text-xs">{iconOption.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button
                    onClick={editingChannel ? handleEditChannel : handleCreateChannel}
                    disabled={!channelName.trim()}
                  >
                    {editingChannel ? "Save Changes" : "Create Channel"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Channels List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredChannels.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No channels found
              </div>
            ) : (
              filteredChannels.map((channel) => {
                const IconComponent = channel.icon;
                const isSelected = channel.id === selectedChannelId;
                const lastMessage = channel.messages[channel.messages.length - 1];
                return (
                  <div
                    key={channel.id}
                    className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedChannelId(channel.id)}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isSelected
                          ? "rgba(255, 255, 255, 0.2)"
                          : `${channel.color}20`,
                      }}
                    >
                      <IconComponent
                        className="h-5 w-5"
                        style={{
                          color: isSelected ? "white" : channel.color,
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p
                          className={`font-medium truncate ${
                            isSelected ? "text-primary-foreground" : ""
                          }`}
                        >
                          {channel.name}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditDialog(channel);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Channel
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowAddMemberDialog(channel.id);
                              }}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Add Members
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChannel(channel.id);
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Channel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {lastMessage && (
                        <p
                          className={`text-xs truncate mt-1 ${
                            isSelected
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {lastMessage.senderName}: {lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right Side - Chat Interface */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedChannel ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const IconComponent = selectedChannel.icon;
                    return (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${selectedChannel.color}20` }}
                      >
                        <IconComponent
                          className="h-5 w-5"
                          style={{ color: selectedChannel.color }}
                        />
                      </div>
                    );
                  })()}
                  <div>
                    <h2 className="font-semibold">{selectedChannel.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedChannel.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" />
                    {selectedChannel.members.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddMemberDialog(selectedChannel.id)}
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedChannel.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No messages yet
                    </h3>
                    <p className="text-muted-foreground">
                      Start the conversation by sending a message
                    </p>
                  </div>
                ) : (
                  selectedChannel.messages.map((message) => {
                    const sender = getSender(message.senderId);
                    const isCurrentUser = message.senderId === currentUser.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          isCurrentUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={sender.avatar} />
                          <AvatarFallback className="text-xs">
                            {getInitials(sender.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`flex-1 max-w-[70%] ${
                            isCurrentUser ? "flex flex-col items-end" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {sender.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(message.timestamp)}
                            </span>
                          </div>
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              isCurrentUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <Input
                  placeholder={`Message #${selectedChannel.name.toLowerCase()}`}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Hash className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No channel selected</h3>
              <p className="text-muted-foreground">
                Select a channel from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Member Dialog */}
      <Dialog
        open={showAddMemberDialog !== null}
        onOpenChange={(open) => !open && setShowAddMemberDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Members</DialogTitle>
            <DialogDescription>
              Select team members to add to this channel
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {dummyTeamMembers.map((member) => {
                const channel = channels.find(
                  (c) => c.id === showAddMemberDialog
                );
                const isMember = channel?.members.some((m) => m.id === member.id);
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    {isMember ? (
                      <Badge variant="secondary">Already Added</Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() =>
                          showAddMemberDialog &&
                          handleAddMember(showAddMemberDialog, member.id)
                        }
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddMemberDialog(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
