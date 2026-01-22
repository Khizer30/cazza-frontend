import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ExternalLink, Loader2 } from "lucide-react";

export const TikTokConnectionForm = ({
  onSubmit,
  isLoading
}: {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}) => {
  const [shopName, setShopName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName.trim()) return;
    onSubmit({ shopName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="shopName">TikTok Shop Name</Label>
        <Input
          id="shopName"
          type="text"
          placeholder="Your TikTok Shop name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
        />
        <p className="text-sm text-muted-foreground">Enter your TikTok Shop business name</p>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Connect to TikTok Shop
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
