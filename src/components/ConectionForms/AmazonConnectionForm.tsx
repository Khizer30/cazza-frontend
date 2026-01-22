import { useState } from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ExternalLink, Loader2 } from "lucide-react";

export const AmazonConnectionForm = ({
  onSubmit,
  isLoading
}: {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}) => {
  const [marketplace, setMarketplace] = useState("");
  const [sellerId, setSellerId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketplace || !sellerId.trim()) return;
    onSubmit({ marketplace, sellerId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="marketplace">Marketplace Region</Label>
        <Select value={marketplace} onValueChange={setMarketplace} required>
          <SelectTrigger>
            <SelectValue placeholder="Select marketplace" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="amazon.co.uk">Amazon UK</SelectItem>
            <SelectItem value="amazon.com">Amazon US</SelectItem>
            <SelectItem value="amazon.de">Amazon Germany</SelectItem>
            <SelectItem value="amazon.fr">Amazon France</SelectItem>
            <SelectItem value="amazon.it">Amazon Italy</SelectItem>
            <SelectItem value="amazon.es">Amazon Spain</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="sellerId">Seller ID</Label>
        <Input
          id="sellerId"
          type="text"
          placeholder="A1XXXXXXXXXXXXXXX"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          required
        />
        <p className="text-sm text-muted-foreground">Find your Seller ID in Seller Central → Settings → Account Info</p>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Connect to Amazon
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
