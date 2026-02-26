import { ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

import { useToast } from "@/components/ToastProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const ShopifyConnectionForm = ({
  isLoading,
  onClose
}: {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  onClose: () => void;
  onConnectionSuccess?: () => void;
}) => {
  const [shopUrl, setShopUrl] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedShop = shopUrl.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (!normalizedShop) return;

    setIsConnecting(true);
    try {
      const { getShopifyInstallUrlService } = await import("@/services/shopifyService");
      const res = await getShopifyInstallUrlService(normalizedShop);
      if (res?.url) {
        onClose();
        window.location.href = res.url;
      }
    } catch (error) {
      console.error("Error connecting Shopify:", error);
      showToast("Failed to connect Shopify. Please check your shop URL.", "error");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="shopUrl">Shop URL or Name</Label>
        <Input
          id="shopUrl"
          type="text"
          placeholder="your-shop.myshopify.com or just 'your-shop'"
          value={shopUrl}
          onChange={(e) => setShopUrl(e.target.value)}
          required
        />
        <p className="text-sm text-muted-foreground">Enter your Shopify shop URL or just the shop name</p>
      </div>
      <Button type="submit" className="w-full" disabled={isConnecting || isLoading}>
        {(isLoading || isConnecting) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Connect to Shopify
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
