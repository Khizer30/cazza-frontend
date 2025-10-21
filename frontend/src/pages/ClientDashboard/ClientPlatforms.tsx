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
import {
  Plug2,
  RefreshCw,
  ShoppingBag,
  Package,
  Smartphone,
  Calculator,
} from "lucide-react";
import { useState } from "react";
const analyticsData = [
  {
    id: "shopify",
    name: "Shopify",
    type: "ecommerce",
    icon: ShoppingBag,
    description: "Import orders, customers, and inventory",
    color: "hsl(var(--chart-4))",
  },
  {
    id: "amazon",
    name: "Amazon",
    type: "marketplace",
    icon: Package,
    description: "Connect Amazon Seller Central",
    color: "hsl(var(--chart-5))",
  },
  {
    id: "tiktok",
    name: "TikTok Shop",
    type: "marketplace",
    icon: Smartphone,
    description: "Sync TikTok Shop orders and products",
    color: "hsl(var(--destructive))",
  },
  {
    id: "xero",
    name: "Xero",
    type: "accounting",
    icon: Calculator,
    description: "Sync accounting data and financial reports",
    color: "hsl(var(--chart-1))",
  },
];

export const ClientPlatforms = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<{
    id: string;
    name: string;
    type: "ecommerce" | "accounting" | "marketplace";
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSync = true;
  const isSyncing = false;

  const handleConnect = (platformId: string) => {
    const platform = analyticsData.find((p) => p.id === platformId);
    if (platform) {
      setSelectedPlatform({
        id: platform.id,
        name: platform.name,
        type: platform.type as "ecommerce" | "marketplace" | "accounting",
      });
      setIsModalOpen(true);
    }
  };
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {/* {connectedPlatforms.length} */}0
            </div>
            <p className="text-sm text-muted-foreground">Connected</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {/* {Math.round(connectionRate)}% */}0
            </div>
            <p className="text-sm text-muted-foreground">Setup Complete</p>
          </div>
        </div>

        <Progress value={25} className="mt-2" />
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
                const Icon = platform.icon;
                return (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Icon
                          className="h-5 w-5"
                          style={{ color: platform.color }}
                        />
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
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => handleConnect(platform.id)}
                      >
                        Connect
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
                const Icon = platform.icon;
                return (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Icon
                          className="h-5 w-5"
                          style={{ color: platform.color }}
                        />
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
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => handleConnect(platform.id)}
                      >
                        Connect
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
