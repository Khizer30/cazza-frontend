import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

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
import { Textarea } from "@/components/ui/textarea";

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
  Send,
  type LucideIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useChat } from "@/hooks/useChat";
import { useTeam } from "@/hooks/useTeam";
import { useUserStore } from "@/store/userStore";
import { Loader2 } from "lucide-react";
import type { ChatGroup } from "@/services/chatService";
import type { TeamMember as TeamMemberType } from "@/types/auth";
import { signInWithCustomToken, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, onSnapshot, addDoc, serverTimestamp, limit, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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
  userRole?: "ADMIN" | "MEMBER";
}

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

export const Channels = () => {
  const { getUserChatGroups, createChatGroup, updateChatGroup, deleteChatGroup, getChatGroupById, addMemberToGroup, removeMemberFromGroup, getFirebaseToken } = useChat();
  const { fetchTeamMembers } = useTeam();
  const { user: loggedInUser } = useUserStore();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  
  const convertChatGroupToChannel = useCallback((chatGroup: ChatGroup): Channel => {
    const defaultIcon = availableIcons[0];
    const icon = availableIcons.find((i) => i.name === "Hash") || defaultIcon;
    
    return {
      id: chatGroup.id,
      name: chatGroup.name,
      description: "",
      icon: icon.icon,
      iconName: icon.name,
      color: icon.color,
      members: [],
      createdAt: chatGroup.createdAt,
      messages: [],
      userRole: chatGroup.role,
    };
  }, []);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState<string | null>(
    null
  );
  const [showRemoveMemberDialog, setShowRemoveMemberDialog] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const isInitializingRef = useRef(false);

  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<{
    name: string;
    icon: LucideIcon;
    color: string;
  }>(availableIcons[0]);

  const selectedChannel = channels.find((c) => c.id === selectedChannelId);
  
  const getCurrentUserRole = (channel: Channel | undefined): "ADMIN" | "MEMBER" | null => {
    if (!channel || !loggedInUser) return null;
    
    if (channel.userRole) {
      return channel.userRole;
    }
    
    const userMember = channel.members.find(
      (m) => 
        m.id === loggedInUser.id || 
        String(m.id) === String(loggedInUser.id)
    );
    
    if (userMember) {
      return userMember.role;
    }
    
    return null;
  };
  
  const currentUserRole = getCurrentUserRole(selectedChannel);
  const isAdmin = currentUserRole === "ADMIN";

  useEffect(() => {
    const loadChatGroups = async () => {
      try {
        setIsLoading(true);
        const chatGroups = await getUserChatGroups();
        
        if (chatGroups && Array.isArray(chatGroups) && chatGroups.length > 0) {
          const convertedChannels = chatGroups
            .filter((group) => group && group.id && group.name)
            .map(convertChatGroupToChannel);
          
          if (convertedChannels.length > 0) {
            setChannels(convertedChannels);
            
            setSelectedChannelId((prev) => {
              if (!prev) {
                return convertedChannels[0].id;
              }
              return prev;
            });
          } else {
            setChannels([]);
          }
        } else {
          setChannels([]);
        }
      } catch (error) {
        console.error("Failed to load chat groups:", error);
        setChannels([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadChatGroups();
  }, []);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        setIsLoadingMembers(true);
        const members = await fetchTeamMembers();
        if (members && members.length > 0) {
          setTeamMembers(members);
        }
      } catch (error) {
        console.error("Failed to load team members:", error);
      } finally {
        setIsLoadingMembers(false);
      }
    };

    loadTeamMembers();
  }, []);

  useEffect(() => {
    if (!selectedChannelId) {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      isInitializingRef.current = false;
      return;
    }

    if (isInitializingRef.current) {
      return;
    }

    const initializeFirebaseAndLoadMessages = async () => {
      isInitializingRef.current = true;
      
      try {
        const customToken = await getFirebaseToken(selectedChannelId);
        
        if (!customToken || typeof customToken !== 'string' || customToken.trim() === '') {
          isInitializingRef.current = false;
          return;
        }
        
        try {
          if (auth.currentUser) {
            await signOut(auth);
          }
          
          await signInWithCustomToken(auth, customToken);
          
          await new Promise<void>((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
              if (user) {
                unsubscribe();
                resolve();
              }
            }, (error) => {
              unsubscribe();
              reject(error);
            });
            
            setTimeout(() => {
              unsubscribe();
              reject(new Error("Auth state change timeout"));
            }, 5000);
          });
          
          if (!auth.currentUser) {
            isInitializingRef.current = false;
            return;
          }
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const messagesRef = collection(db, "chat_groups", selectedChannelId, "messages");
          
          const messagesQuery = query(messagesRef, limit(100));
          
          const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const firebaseMessages: ChannelMessage[] = snapshot.docs
              .map((doc) => {
                const data = doc.data();
                const timestamp = data.timestamp as Timestamp;
                return {
                  id: doc.id,
                  channelId: selectedChannelId,
                  senderId: data.senderId || "",
                  senderName: data.senderName || "",
                  content: data.content || "",
                  timestamp: timestamp ? timestamp.toDate() : new Date(),
                };
              })
              .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
            
            setChannels((prevChannels) =>
              prevChannels.map((channel) =>
                channel.id === selectedChannelId
                  ? { ...channel, messages: firebaseMessages }
                  : channel
              )
            );
          }, (error: any) => {
            console.error("Firestore listener error:", error);
            if (error?.code === 'permission-denied') {
              isInitializingRef.current = false;
            }
          });
          
          unsubscribeRef.current = unsubscribe;
          isInitializingRef.current = false;
        } catch (authError: any) {
          console.error("Firebase authentication error:", authError);
          isInitializingRef.current = false;
        }
      } catch (error) {
        console.error("Failed to initialize Firebase:", error);
        isInitializingRef.current = false;
      }
    };

    initializeFirebaseAndLoadMessages();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      isInitializingRef.current = false;
    };
  }, [selectedChannelId]);

  useEffect(() => {
    if (!selectedChannelId) return;

    const loadChannelDetails = async () => {
      try {
        const channelDetails = await getChatGroupById(selectedChannelId);
        if (channelDetails) {
          const creatorId = (channelDetails as any).createdBy;
          let creatorMember = null;
          
          if (creatorId) {
            creatorMember = teamMembers.find(
              (tm) => 
                tm.id === creatorId || 
                tm.userId === creatorId || 
                tm.user_id === creatorId ||
                String(tm.id) === String(creatorId) ||
                String(tm.userId) === String(creatorId) ||
                String(tm.user_id) === String(creatorId)
            );
            
            if (!creatorMember && loggedInUser && (
              loggedInUser.id === creatorId || 
              String(loggedInUser.id) === String(creatorId)
            )) {
              creatorMember = {
                id: loggedInUser.id,
                userId: loggedInUser.id,
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                name: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
                email: loggedInUser.email,
                profileImage: loggedInUser.profileImage,
                avatar: loggedInUser.profileImage,
              } as any;
            }
          }

          const getCreatorDisplayName = () => {
            if (creatorMember && 'firstName' in creatorMember && creatorMember.firstName && 'lastName' in creatorMember && creatorMember.lastName) {
              return `${creatorMember.firstName} ${creatorMember.lastName}`;
            }
            if (creatorMember && 'firstName' in creatorMember && creatorMember.firstName) {
              return creatorMember.firstName;
            }
            if (creatorMember?.firstName && creatorMember?.lastName) {
              return `${creatorMember.firstName} ${creatorMember.lastName}`;
            }
            if (creatorMember?.firstName) {
              return creatorMember.firstName;
            }
            if (creatorMember?.name) {
              return creatorMember.name;
            }
            const email = (creatorMember as any)?.email || creatorMember?.profiles?.email;
            return email || "User";
          };

          const processedMembers = channelDetails.members
            ?.filter((member) => member.userId !== creatorId)
            .map((member) => {
              let teamMember = teamMembers.find(
                (tm) => 
                  tm.id === member.userId || 
                  tm.userId === member.userId || 
                  tm.user_id === member.userId ||
                  String(tm.id) === String(member.userId) ||
                  String(tm.userId) === String(member.userId) ||
                  String(tm.user_id) === String(member.userId)
              );
              
              if (!teamMember && loggedInUser && (
                loggedInUser.id === member.userId || 
                String(loggedInUser.id) === String(member.userId)
              )) {
                teamMember = {
                  id: loggedInUser.id,
                  userId: loggedInUser.id,
                  firstName: loggedInUser.firstName,
                  lastName: loggedInUser.lastName,
                  name: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
                  email: loggedInUser.email,
                  profileImage: loggedInUser.profileImage,
                  avatar: loggedInUser.profileImage,
                } as any;
              }
              
              const getDisplayName = () => {
                if (teamMember?.firstName && teamMember?.lastName) {
                  return `${teamMember.firstName} ${teamMember.lastName}`;
                }
                if (teamMember?.firstName) {
                  return teamMember.firstName;
                }
                if (teamMember?.name) {
                  return teamMember.name;
                }
                return teamMember?.email || teamMember?.profiles?.email || "User";
              };

              return {
                id: member.userId,
                name: getDisplayName(),
                email: teamMember?.email || teamMember?.profiles?.email || "",
                avatar: teamMember?.profileImage || teamMember?.avatar,
                role: member.role,
              };
            }) || [];

          const finalMembers: TeamMember[] = [];
          if (creatorId) {
            const creatorEmail = (creatorMember as any)?.email || creatorMember?.profiles?.email || "";
            const creatorAvatar = (creatorMember as any)?.profileImage || creatorMember?.avatar || creatorMember?.profileImage;
            
            finalMembers.push({
              id: creatorId,
              name: getCreatorDisplayName(),
              email: creatorEmail,
              avatar: creatorAvatar,
              role: "ADMIN" as const,
            });
          }
          finalMembers.push(...processedMembers);

          setChannels((prevChannels) =>
            prevChannels.map((channel) =>
              channel.id === selectedChannelId
                ? {
                    ...channel,
                    members: finalMembers,
                    userRole: (channelDetails as any).userRole || (channelDetails as any).role,
                  }
                : channel
            )
          );
        }
      } catch (error) {
        console.error("Failed to load channel details:", error);
      }
    };

    loadChannelDetails();
  }, [selectedChannelId, teamMembers, loggedInUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChannel?.messages]);

  const filteredChannels = channels.filter(
    (channel) =>
      channel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateChannel = async () => {
    if (!channelName.trim() || isCreating) return;

    try {
      setIsCreating(true);
      const createdGroup = await createChatGroup({ name: channelName.trim() });
      
      if (createdGroup) {
        const newChannel = convertChatGroupToChannel(createdGroup);
        setChannels([newChannel, ...channels]);
        setSelectedChannelId(newChannel.id);
      }

      setChannelName("");
      setChannelDescription("");
      setSelectedIcon(availableIcons[0]);
      setShowCreateDialog(false);
    } catch (error) {
      console.error("Failed to create channel:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditChannel = async () => {
    if (!editingChannel || !channelName.trim() || isUpdating) return;

    try {
      setIsUpdating(true);
      await updateChatGroup(editingChannel.id, channelName.trim());
      
      setChannels(
        channels.map((channel) =>
          channel.id === editingChannel.id
            ? {
                ...channel,
                name: channelName.trim(),
                description: channelDescription.trim(),
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
      setShowCreateDialog(false);
    } catch (error) {
      console.error("Failed to update channel:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteChannel = async (channelId: string) => {
    if (isDeleting === channelId) return;

    try {
      setIsDeleting(channelId);
      await deleteChatGroup(channelId);
      
      const updatedChannels = channels.filter((channel) => channel.id !== channelId);
      setChannels(updatedChannels);
      
      if (selectedChannelId === channelId) {
        setSelectedChannelId(updatedChannels[0]?.id || null);
      }
    } catch (error) {
      console.error("Failed to delete channel:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleAddMember = async (channelId: string, memberId: string) => {
    try {
      await addMemberToGroup(channelId, memberId, "MEMBER");
      
      setShowAddMemberDialog(null);
      
      const channelDetails = await getChatGroupById(channelId);
      if (channelDetails) {
        setChannels((prevChannels) =>
          prevChannels.map((channel) =>
            channel.id === channelId
              ? {
                  ...channel,
                  members: channelDetails.members?.map((member) => {
                    const teamMember = teamMembers.find(
                      (tm) => tm.id === member.userId || tm.userId === member.userId || tm.user_id === member.userId
                    );
                    const getDisplayName = () => {
                      if (teamMember?.firstName && teamMember?.lastName) {
                        return `${teamMember.firstName} ${teamMember.lastName}`;
                      }
                      if (teamMember?.firstName) {
                        return teamMember.firstName;
                      }
                      if (teamMember?.name) {
                        return teamMember.name;
                      }
                      return teamMember?.email || teamMember?.profiles?.email || "User";
                    };

                    return {
                      id: member.userId,
                      name: getDisplayName(),
                      email: teamMember?.email || teamMember?.profiles?.email || "",
                      avatar: teamMember?.profileImage || teamMember?.avatar,
                      role: member.role,
                    };
                  }) || [],
                }
              : channel
          )
        );
      }
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const handleRemoveMember = async (channelId: string, userId: string) => {
    try {
      await removeMemberFromGroup(channelId, userId);
      
      setShowRemoveMemberDialog(null);
      
      const channelDetails = await getChatGroupById(channelId);
      if (channelDetails) {
        setChannels((prevChannels) =>
          prevChannels.map((channel) =>
            channel.id === channelId
              ? {
                  ...channel,
                  members: channelDetails.members?.map((member) => {
                    const teamMember = teamMembers.find(
                      (tm) => tm.id === member.userId || tm.userId === member.userId || tm.user_id === member.userId
                    );
                    const getDisplayName = () => {
                      if (teamMember?.firstName && teamMember?.lastName) {
                        return `${teamMember.firstName} ${teamMember.lastName}`;
                      }
                      if (teamMember?.firstName) {
                        return teamMember.firstName;
                      }
                      if (teamMember?.name) {
                        return teamMember.name;
                      }
                      return teamMember?.email || teamMember?.profiles?.email || "User";
                    };

                    return {
                      id: member.userId,
                      name: getDisplayName(),
                      email: teamMember?.email || teamMember?.profiles?.email || "",
                      avatar: teamMember?.profileImage || teamMember?.avatar,
                      role: member.role,
                    };
                  }) || [],
                }
              : channel
          )
        );
      }
    } catch (error) {
      console.error("Failed to remove member:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChannelId || !loggedInUser) return;

    try {
      if (!auth.currentUser) {
        return;
      }
      
      const messagesRef = collection(db, "chat_groups", selectedChannelId, "messages");
      const senderName = loggedInUser.firstName && loggedInUser.lastName
        ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
        : loggedInUser.firstName || loggedInUser.email || "User";

      await addDoc(messagesRef, {
        senderId: loggedInUser.id,
        senderName: senderName,
        content: messageInput.trim(),
        timestamp: serverTimestamp(),
      });

      setMessageInput("");
    } catch (error: any) {
      console.error("Failed to send message:", error);
    }
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
    const teamMember = teamMembers.find((m) => m.id === senderId || m.userId === senderId || m.user_id === senderId);
    if (teamMember) {
      const getDisplayName = () => {
        if (teamMember.firstName && teamMember.lastName) {
          return `${teamMember.firstName} ${teamMember.lastName}`;
        }
        if (teamMember.firstName) {
          return teamMember.firstName;
        }
        if (teamMember.name) {
          return teamMember.name;
        }
        return teamMember.email || teamMember.profiles?.email || "User";
      };

      return {
        id: teamMember.id || teamMember.userId || teamMember.user_id || "",
        name: getDisplayName(),
        email: teamMember.email || teamMember.profiles?.email || "",
        avatar: teamMember.profileImage || teamMember.avatar,
        role: teamMember.role as "MEMBER" | "ADMIN",
      };
    }
    
    if (loggedInUser && (loggedInUser.id === senderId || String(loggedInUser.id) === String(senderId))) {
      const getDisplayName = () => {
        if (loggedInUser.firstName && loggedInUser.lastName) {
          return `${loggedInUser.firstName} ${loggedInUser.lastName}`;
        }
        if (loggedInUser.firstName) {
          return loggedInUser.firstName;
        }
        return loggedInUser.email || "User";
      };

      return {
        id: loggedInUser.id,
        name: getDisplayName(),
        email: loggedInUser.email || "",
        avatar: loggedInUser.profileImage,
        role: "MEMBER" as const,
      };
    }
    
    return {
      id: senderId,
      name: "User",
      email: "",
      avatar: undefined,
      role: "MEMBER" as const,
    };
  };

  const formatMessageTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <div className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Channels</h2>
            <Dialog
              open={showCreateDialog}
              onOpenChange={(open) => {
                if (!open) {
                  closeDialog();
                } else {
                  if (!editingChannel) {
                    setEditingChannel(null);
                    setChannelName("");
                    setChannelDescription("");
                    setSelectedIcon(availableIcons[0]);
                  }
                  setShowCreateDialog(true);
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setEditingChannel(null);
                    setChannelName("");
                    setChannelDescription("");
                    setSelectedIcon(availableIcons[0]);
                    setShowCreateDialog(true);
                  }}
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
                    <Label htmlFor="name">Title *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Sales Team"
                      value={channelName}
                      onChange={(e) => setChannelName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="What is this channel about? (Optional)"
                      value={channelDescription}
                      onChange={(e) => setChannelDescription(e.target.value)}
                      rows={4}
                      className="resize-none"
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
                                <span className="text-xs">
                                  {iconOption.name}
                                </span>
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
                    onClick={
                      editingChannel ? handleEditChannel : handleCreateChannel
                    }
                    disabled={
                      !channelName.trim() ||
                      (editingChannel ? isUpdating : isCreating)
                    }
                  >
                    {editingChannel ? (
                      isUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )
                    ) : isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Channel"
                    )}
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

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : filteredChannels.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No channels found
              </div>
            ) : (
              filteredChannels.map((channel) => {
                const IconComponent = channel.icon;
                const isSelected = channel.id === selectedChannelId;
                const lastMessage =
                  channel.messages[channel.messages.length - 1];
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
                          color: isSelected ? "black" : channel.color,
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`font-medium truncate ${
                            isSelected ? "text-primary-foreground" : ""
                          }`}
                        >
                          {channel.name}
                        </p>
                        {getCurrentUserRole(channel) === "ADMIN" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 flex-shrink-0"
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
                        )}
                      </div>
                      {channel.description && (
                        <p
                          className={`text-xs truncate mt-1 ${
                            isSelected
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                          title={channel.description}
                        >
                          {channel.description}
                        </p>
                      )}
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

      <div className="flex-1 flex flex-col bg-background">
        {selectedChannel ? (
          <>
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const IconComponent = selectedChannel.icon;
                    return (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${selectedChannel.color}20`,
                        }}
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
                  {isAdmin && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowAddMemberDialog(selectedChannel.id)}
                        title="Add Members"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      {selectedChannel.members.length > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowRemoveMemberDialog(selectedChannel.id)}
                          title="Remove Members"
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

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
                    const isCurrentUser = loggedInUser && (message.senderId === loggedInUser.id || String(message.senderId) === String(loggedInUser.id));
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
              <h3 className="text-lg font-semibold mb-2">
                No channel selected
              </h3>
              <p className="text-muted-foreground">
                Select a channel from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>

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
              {isLoadingMembers ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : teamMembers.length > 0 ? (
                teamMembers.map((member) => {
                  const channel = channels.find(
                    (c) => c.id === showAddMemberDialog
                  );
                  const isMember = channel?.members.some(
                    (m) => m.id === member.id || m.id === member.userId || m.id === member.user_id
                  );
                  return (
                    <div
                      key={member.id || member.userId || member.user_id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.profileImage || member.avatar} />
                          <AvatarFallback>
                            {getInitials(member.name || member.firstName || "User")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {member.name || `${member.firstName || ""} ${member.lastName || ""}`.trim() || "User"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {member.email || member.profiles?.email || ""}
                          </p>
                        </div>
                      </div>
                      {isMember ? (
                        <Badge variant="secondary">Already Added</Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            if (showAddMemberDialog && (member.id || member.userId || member.user_id)) {
                              handleAddMember(showAddMemberDialog, member.id || member.userId || member.user_id || "");
                            }
                          }}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Add
                        </Button>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No team members available
                </div>
              )}
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

      <Dialog
        open={showRemoveMemberDialog !== null}
        onOpenChange={(open) => !open && setShowRemoveMemberDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Channel Members</DialogTitle>
            <DialogDescription>
              Select members to remove from this channel
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {showRemoveMemberDialog &&
                channels
                  .find((c) => c.id === showRemoveMemberDialog)
                  ?.members.map((member) => {
                    const channel = channels.find((c) => c.id === showRemoveMemberDialog);
                    const adminMembers = channel?.members.filter((m) => m.role === "ADMIN") || [];
                    const isLastAdmin = member.role === "ADMIN" && adminMembers.length === 1;
                    
                    const memberUserId = member.id;
                    let teamMember = teamMembers.find(
                      (tm) => {
                        return (
                          tm.id === memberUserId ||
                          tm.userId === memberUserId ||
                          tm.user_id === memberUserId ||
                          String(tm.id) === String(memberUserId) ||
                          String(tm.userId) === String(memberUserId) ||
                          String(tm.user_id) === String(memberUserId)
                        );
                      }
                    );

                    if (!teamMember && loggedInUser && (
                      loggedInUser.id === memberUserId ||
                      String(loggedInUser.id) === String(memberUserId)
                    )) {
                      teamMember = loggedInUser as any;
                    }

                    const getDisplayName = () => {
                      if (teamMember?.firstName && teamMember?.lastName) {
                        return `${teamMember.firstName} ${teamMember.lastName}`;
                      }
                      if (teamMember?.firstName) {
                        return teamMember.firstName;
                      }
                      if (teamMember?.name) {
                        return teamMember.name;
                      }
                      if (member.name && member.name !== "User") {
                        return member.name;
                      }
                      return teamMember?.email || teamMember?.profiles?.email || member.email || "User";
                    };

                    const displayName = getDisplayName();
                    const displayEmail = teamMember?.email || teamMember?.profiles?.email || member.email || "";
                    
                    return (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={teamMember?.profileImage || teamMember?.avatar || member.avatar} />
                            <AvatarFallback>
                              {getInitials(displayName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{displayName}</p>
                            {displayEmail && (
                              <p className="text-xs text-muted-foreground">
                                {displayEmail}
                              </p>
                            )}
                            {member.role === "ADMIN" && (
                              <Badge variant="secondary" className="mt-1 text-xs">
                                Admin
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isLastAdmin}
                          onClick={() =>
                            showRemoveMemberDialog &&
                            handleRemoveMember(showRemoveMemberDialog, member.id)
                          }
                          title={isLastAdmin ? "Cannot remove the last admin from the group" : "Remove member"}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    );
                  })}
              {showRemoveMemberDialog &&
                channels.find((c) => c.id === showRemoveMemberDialog)?.members
                  .length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No members to remove
                  </div>
                )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRemoveMemberDialog(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
