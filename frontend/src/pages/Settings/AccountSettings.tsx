import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Camera, Loader2, Trash2, Upload } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountSettings = () => {
  const navigate = useNavigate();
  // Role can be derived from user context / auth in real implementation.
  // Defaulting to 'client' for now. Change to 'accountant' to view accountant UI.
  const [role] = useState<"client" | "accountant">("client");
  const isClient = role === "client";

  // Avatar upload state
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form and saving state
  const [saving, setSaving] = useState(false);

  type AccountFormData = {
    firstName: string;
    lastName: string;
    email: string;
    firmName: string;
    clientCount?: string;
    staffCount?: string;
    allowClientInvites?: boolean;
    marketplaces: string[];
    accountingStack: {
      hasXero: boolean;
      multiCurrency: boolean;
      integrations: string[];
    };
    businessName?: string;
    entityType?: string;
    revenueBand?: string;
  };

  const [formData, setFormData] = useState<AccountFormData>({
    firstName: "Shahzaib",
    lastName: "Farooq",
    email: "",
    firmName: "",
    marketplaces: [],
    accountingStack: { hasXero: false, multiCurrency: false, integrations: [] },
    businessName: "",
    entityType: "",
    revenueBand: "",
  });

  // Update top-level keys on formData. For nested updates pass the full object (example used in file).
  const updateFormData = useCallback((key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  }, []);

  const toggleMarketplace = useCallback((marketplace: string) => {
    setFormData((prev: any) => {
      const list: string[] = prev.marketplaces || [];
      const exists = list.includes(marketplace);
      return {
        ...prev,
        marketplaces: exists
          ? list.filter((m) => m !== marketplace)
          : [...list, marketplace],
      };
    });
  }, []);

  const toggleIntegration = useCallback((integration: string) => {
    setFormData((prev: any) => {
      const list: string[] = prev.accountingStack?.integrations || [];
      const exists = list.includes(integration);
      const newIntegrations = exists
        ? list.filter((i) => i !== integration)
        : [...list, integration];
      return {
        ...prev,
        accountingStack: {
          ...(prev.accountingStack || {}),
          integrations: newIntegrations,
        },
      };
    });
  }, []);

  const handleAvatarUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      // For now just create a local preview URL. Replace with actual upload logic.
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      // simulate upload delay
      setTimeout(() => setUploading(false), 800);
    },
    []
  );

  const handleRemoveAvatar = useCallback(() => {
    // Placeholder: remove avatar locally. Add API call as needed.
    setAvatarUrl(null);
  }, []);

  const handleSave = useCallback(() => {
    setSaving(true);
    // Placeholder: call save API here. We'll simulate a save delay.
    setTimeout(() => {
      setSaving(false);
      // Optionally show toast/notification
      // console.log('Saved', formData);
    }, 800);
  }, [formData]);

  const handleDeleteAccount = useCallback(() => {
    // Placeholder delete handler - wire to API and confirmation flow as needed.
    // For now simply log and close dialog will be handled by AlertDialog.
    // console.log('Delete account requested');
  }, []);

  return (
    <div className="max-w-4xl space-y-6 mx-auto my-4">
      {/* Profile Picture Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <h2>Profile Picture</h2>
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/client/dashboard");
                }}
                className="gap-2 "
              >
                <svg
                  className="w-4 h-4 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Go to Dashboard
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Update your profile picture to help others recognize you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl ?? undefined} alt="Profile" />
              <AvatarFallback className="text-2xl">
                {formData.firstName.charAt(0)}
                {formData.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                <Button
                  variant="outline"
                  className="gap-2"
                  //   disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <Upload className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4" />
                      Upload new picture
                    </>
                  )}
                </Button>
              </div>
              <Button
                variant="ghost"
                onClick={handleRemoveAvatar}
                disabled={uploading || !avatarUrl}
              >
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              disabled
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Business/Firm Information */}
      <Card>
        <CardHeader>
          <CardTitle>{"Tell us about your business"}</CardTitle>
          <CardDescription>
            {"Help us understand your business structure"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {
            <>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    updateFormData("businessName", e.target.value)
                  }
                  placeholder="Your business or trading name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entityType">Business Entity Type</Label>
                <Select
                  value={formData.entityType}
                  onValueChange={(value) => updateFormData("entityType", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole-trader">Sole Trader</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="limited-company">
                      Limited Company
                    </SelectItem>
                    <SelectItem value="llp">
                      Limited Liability Partnership (LLP)
                    </SelectItem>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenueBand">Annual Revenue Band</Label>
                <Select
                  value={formData.revenueBand}
                  onValueChange={(value) =>
                    updateFormData("revenueBand", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select revenue band" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-85k">
                      £0 to £85,000 (Below VAT threshold)
                    </SelectItem>
                    <SelectItem value="85k-750k">£85,000 - £750,000</SelectItem>
                    <SelectItem value="750k-2m">£750,000 - £2m</SelectItem>
                    <SelectItem value="2m-5m">£2-5m</SelectItem>
                    <SelectItem value="5m-10m">£5-10m</SelectItem>
                    <SelectItem value="10m+">£10m+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          }
        </CardContent>
      </Card>

      {/* Online Marketplaces - Only for Clients */}
      {isClient && (
        <Card>
          <CardHeader>
            <CardTitle>Online Marketplaces</CardTitle>
            <CardDescription>
              Select which online marketplaces you use for your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Amazon",
                "eBay",
                "TikTok Shop",
                "Shopify",
                "WooCommerce",
                "Etsy",
                "Facebook Marketplace",
                "Instagram Shopping",
                "Other",
              ].map((marketplace: string) => (
                <div key={marketplace} className="flex items-center space-x-2">
                  <Checkbox
                    id={marketplace}
                    checked={formData.marketplaces.includes(marketplace)}
                    onCheckedChange={() => toggleMarketplace(marketplace)}
                  />
                  <Label htmlFor={marketplace}>{marketplace}</Label>
                </div>
              ))}
            </div>
            {formData.marketplaces.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Selected marketplaces:
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.marketplaces.map((marketplace) => (
                    <Badge key={marketplace} variant="secondary">
                      {marketplace}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Accounting Stack - Only for Clients */}
      {isClient && (
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack & Integrations</CardTitle>
            <CardDescription>
              Tell us about your current accounting and payment setup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasXero"
                  checked={formData.accountingStack.hasXero}
                  onCheckedChange={(checked) =>
                    updateFormData("accountingStack", {
                      ...formData.accountingStack,
                      hasXero: checked,
                    })
                  }
                />
                <Label htmlFor="hasXero">I use Xero</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="multiCurrency"
                  checked={formData.accountingStack.multiCurrency}
                  onCheckedChange={(checked) =>
                    updateFormData("accountingStack", {
                      ...formData.accountingStack,
                      multiCurrency: checked,
                    })
                  }
                />
                <Label htmlFor="multiCurrency">
                  I work with multiple currencies
                </Label>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">
                Payment Gateways & Integrations:
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  "Stripe",
                  "PayPal",
                  "Square",
                  "Klarna",
                  "Wise",
                  "Revolut",
                  "Other",
                ].map((integration: string) => (
                  <div
                    key={integration}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={integration}
                      checked={formData.accountingStack.integrations.includes(
                        integration
                      )}
                      onCheckedChange={() => toggleIntegration(integration)}
                    />
                    <Label htmlFor={integration}>{integration}</Label>
                  </div>
                ))}
              </div>
            </div>

            {formData.accountingStack.integrations.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Selected integrations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.accountingStack.integrations.map((integration) => (
                    <Badge key={integration} variant="secondary">
                      {integration}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="px-8">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <Separator />

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};
