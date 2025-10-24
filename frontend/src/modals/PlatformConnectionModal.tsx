import { AmazonConnectionForm } from "@/components/ConectionForms/AmazonConnectionForm";
import { ShopifyConnectionForm } from "@/components/ConectionForms/ShopifyConnectionForm";
import { TikTokConnectionForm } from "@/components/ConectionForms/TikTokConnectionForm";
import { XeroConnectionForm } from "@/components/ConectionForms/XeroConnectionForm";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
interface PlatformConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: {
    id: string;
    name: string;
    type: "ecommerce" | "accounting" | "marketplace";
  } | null;
  onConnect?: (platformId: string, credentials: any) => void;
  onConnectionSuccess?: () => void; // New prop to notify parent of successful connection
}
export const PlatformConnectionModal = ({
  isOpen,
  onClose,
  platform,
  // onConnect,
  onConnectionSuccess,
}: PlatformConnectionModalProps) => {
  const [isLoading, ] = useState(false);

  const handleSubmit = async () => {};

  const renderPlatformForm = () => {
    if (!platform) return null;

    switch (platform.id) {
      case "shopify":
        return (
          <ShopifyConnectionForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onClose={onClose}
            onConnectionSuccess={onConnectionSuccess}
          />
        );
      case "amazon":
        return (
          <AmazonConnectionForm onSubmit={handleSubmit} isLoading={isLoading} />
        );
      case "tiktok":
        return (
          <TikTokConnectionForm onSubmit={handleSubmit} isLoading={isLoading} />
        );
      case "xero":
        return (
          <XeroConnectionForm onSubmit={handleSubmit} isLoading={isLoading} />
        );
      default:
        return (
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              Platform connection form not available yet.
            </p>
            <Button onClick={onClose} variant="outline" className="mt-4">
              Close
            </Button>
          </div>
        );
    }
  };

  if (!platform) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect to {platform.name}</DialogTitle>
          <DialogDescription>
            {platform.type === "accounting"
              ? "Connect your accounting software to sync financial data and reports."
              : "Connect your sales platform to sync orders, products, and customer data."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">{renderPlatformForm()}</div>
      </DialogContent>
    </Dialog>
  );
};
