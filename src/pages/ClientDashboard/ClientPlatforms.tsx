import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlatformConnectionModal } from "@/modals/PlatformConnectionModal";
import { Plug2, RefreshCw } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShopify,
  faAmazon,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/userStore";

const analyticsData = [
  {
    id: "shopify",
    name: "Shopify",
    apiName: "SHOPIFY",
    type: "ecommerce",
    icon: faShopify,
    description: "Import orders, customers, and inventory",
    color: "#96bf48",
  },
  {
    id: "amazon",
    name: "Amazon",
    apiName: "AMAZON",
    type: "marketplace",
    icon: faAmazon,
    description: "Connect Amazon Seller Central",
    color: "#FF9900",
  },
  {
    id: "tiktok",
    name: "TikTok Shop",
    apiName: "TIKTOK",
    type: "marketplace",
    icon: faTiktok,
    description: "Sync TikTok Shop orders and products",
    color: "#FFFFFF",
  },
  {
    id: "xero",
    name: "Xero",
    apiName: "XERO",
    type: "accounting",
    imageUrl: "/xero-logo.svg",
    description: "Sync accounting data and financial reports",
    color: "#13B5EA",
  },
];

export const ClientPlatforms = () => {
  const { user } = useUserStore();
  const { updateUser, fetchUserProfile } = useUser();
  const [selectedPlatform, setSelectedPlatform] = useState<{
    id: string;
    name: string;
    type: "ecommerce" | "accounting" | "marketplace";
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const handleSync = true;
  const isSyncing = false;

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  const isPlatformConnected = (apiName: string): boolean => {
    return user?.platforms?.includes(apiName) || false;
  };

  const handleConnect = async (platformId: string) => {
    const platform = analyticsData.find((p) => p.id === platformId);
    if (!platform) return;

    if (isPlatformConnected(platform.apiName)) {
      await handleDisconnect(platform.apiName, platform.name);
      return;
    }

    try {
      setIsUpdating(true);
      const currentPlatforms = user?.platforms || [];
      const updatedPlatforms = [...currentPlatforms, platform.apiName];

      await updateUser({ platforms: updatedPlatforms });
    } catch (error) {
      console.error("Error connecting platform:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDisconnect = async (apiName: string, platformName?: string) => {
    try {
      setIsUpdating(true);
      const currentPlatforms = user?.platforms || [];
      const updatedPlatforms = currentPlatforms.filter((p) => p !== apiName);

      await updateUser({ platforms: updatedPlatforms });
    } catch (error) {
      console.error("Error disconnecting platform:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const connectedCount = user?.platforms?.length || 0;
  return (
    <Card className="m-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Plug2 className="h-5 w-5" />
            Platform Integrations
          </CardTitle>
          {handleSync && (
            <Button
              variant="outline"
              size="sm"
              // onClick={handleSync}
              // disabled={isSyncing}
              className={`flex items-center gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 focus:bg-primary/10 focus:text-primary focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all duration-200 midday-button ${
                isSyncing
                  ? "bg-success/10 border-success/20 text-success animate-pulse"
                  : ""
              } ${isSyncing ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  isSyncing ? "animate-spin text-success" : ""
                }`}
              />
              {isSyncing ? "Syncing..." : "Sync"}
            </Button>
          )}
        </div>
        <CardDescription>
          Connect your sales platforms and accounting software for real-time
          insights
        </CardDescription>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {connectedCount}
            </div>
            <p className="text-sm text-muted-foreground">Connected</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {analyticsData.length > 0 ? Math.round((connectedCount / analyticsData.length) * 100) : 0}%
            </div>
            <p className="text-sm text-muted-foreground">Setup Complete</p>
          </div>
        </div>

        <Progress value={analyticsData.length > 0 ? (connectedCount / analyticsData.length) * 100 : 0} className="mt-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Accounting */}
        <div>
          <h4 className="font-semibold mb-3 text-foreground">
            Accounting Software
          </h4>
          <div className="space-y-3">
            {analyticsData
              .filter((platform) => platform.type === "accounting")
              .map((platform) => {
                return (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        {platform.imageUrl ? (
                          <img
                            src={platform.imageUrl}
                            alt={`${platform.name} logo`}
                            className="h-8 w-8 object-contain"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={platform.icon}
                            className="h-5 w-5"
                            style={{ color: platform.color }}
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">{platform.name}</h5>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {platform.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        className={
                          isPlatformConnected(platform.apiName)
                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }
                        onClick={() => handleConnect(platform.id)}
                        disabled={isUpdating}
                      >
                        {isPlatformConnected(platform.apiName) ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Sales Platforms */}
        <div>
          <h4 className="font-semibold mb-3 text-foreground">
            Sales Platforms
          </h4>
          <div className="space-y-3">
            {analyticsData
              .filter(
                (platform) =>
                  platform.type === "ecommerce" ||
                  platform.type === "marketplace"
              )
              .map((platform) => {
                return (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        {platform.imageUrl ? (
                          <img
                            src={platform.imageUrl}
                            alt={`${platform.name} logo`}
                            className="h-8 w-8 object-contain"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={platform.icon}
                            className="h-5 w-5"
                            style={{ color: platform.color }}
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">{platform.name}</h5>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {platform.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        className={
                          isPlatformConnected(platform.apiName)
                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }
                        onClick={() => handleConnect(platform.id)}
                        disabled={isUpdating}
                      >
                        {isPlatformConnected(platform.apiName) ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </CardContent>

      {/* Modal for Connect flow */}
      <PlatformConnectionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlatform(null);
        }}
        platform={selectedPlatform}
        // onConnectionSuccess={handleConnectionSuccess}
      />
    </Card>
  );
};
