import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";

interface OnboardingData {
  businessName: string;
  businessEntityType: string;
  annualRevenueBand: string;
  marketplaces: string[];
  tools: string[];
  techStack: {
    useXero: boolean;
    multipleCurrencies: boolean;
  };
}

const steps = ["Business Info", "Online Marketplaces", "Tools & Tech Stack"];

const availableTools = [
  "QuickBooks",
  "Stripe",
  "PayPal",
  "Xero",
  "Sage",
  "FreeAgent",
  "Other",
];

export function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding, isLoading } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    businessName: "",
    businessEntityType: "",
    annualRevenueBand: "",
    marketplaces: [],
    tools: [],
    techStack: { useXero: false, multipleCurrencies: false },
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleCheckbox = (field: string, value: string) => {
    setFormData((prev) => {
      const arr = prev[field as keyof OnboardingData] as string[];
      const exists = arr.includes(value);
      return {
        ...prev,
        [field]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleFinish = async () => {
    // Validate required fields
    if (
      !formData.businessName ||
      !formData.businessEntityType ||
      !formData.annualRevenueBand
    ) {
      return;
    }

    try {
      // Map form data to API payload
      const payload = {
        businessName: formData.businessName,
        businessEntityType: formData.businessEntityType,
        annualRevenueBand: formData.annualRevenueBand,
        marketplaces: formData.marketplaces,
        tools: formData.tools,
        useXero: formData.techStack.useXero,
        useMultipleCurrencies: formData.techStack.multipleCurrencies,
      };

      await completeOnboarding(payload);
      // Navigate to dashboard after successful onboarding
      navigate("/client");
    } catch (error) {
      console.error("Onboarding submission error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="shadow-md rounded-2xl w-xl">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {steps[step]}
          </h2>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="business"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Business Name</label>
                    <Input
                      placeholder="Your business or trading name"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessName: e.target.value,
                        })
                      }
                      disabled={isLoading}
                    />
                  </div>

                  <div className="">
                    <label className="text-sm font-medium">
                      Business Entity Type
                    </label>
                    <Select
                      value={formData.businessEntityType}
                      onValueChange={(v) =>
                        setFormData({ ...formData, businessEntityType: v })
                      }
                      disabled={isLoading}
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

                  <div>
                    <label className="text-sm font-medium">
                      Annual Revenue Band
                    </label>
                    <Select
                      value={formData.annualRevenueBand}
                      onValueChange={(v) =>
                        setFormData({ ...formData, annualRevenueBand: v })
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select revenue band" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-85k">
                          £0 to £85,000 (Below VAT threshold)
                        </SelectItem>
                        <SelectItem value="85k-750k">
                          £85,000 - £750,000
                        </SelectItem>
                        <SelectItem value="750k-2m">£750,000 - £2m</SelectItem>
                        <SelectItem value="2m-5m">£2-5m</SelectItem>
                        <SelectItem value="5m-10m">£5-10m</SelectItem>
                        <SelectItem value="10m+">£10m+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="marketplaces"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-sm mb-3">
                  Select which online marketplaces you use:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Amazon",
                    "TikTok Shop",
                    "WooCommerce",
                    "Facebook Marketplace",
                    "eBay",
                    "Shopify",
                    "Etsy",
                    "Instagram Shopping",
                    "Other",
                  ].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.marketplaces.includes(item)}
                        onCheckedChange={() =>
                          handleCheckbox("marketplaces", item)
                        }
                        disabled={isLoading}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="techstack"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-sm mb-3">
                      Select the tools you currently use:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTools.map((tool) => (
                        <label
                          key={tool}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={formData.tools.includes(tool)}
                            onCheckedChange={() =>
                              handleCheckbox("tools", tool)
                            }
                            disabled={isLoading}
                          />
                          <span>{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm mb-3">Additional preferences:</p>
                    <label className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        checked={formData.techStack.useXero}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            techStack: {
                              ...formData.techStack,
                              useXero: !!checked,
                            },
                          })
                        }
                        disabled={isLoading}
                      />
                      <span>I use Xero</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.techStack.multipleCurrencies}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            techStack: {
                              ...formData.techStack,
                              multipleCurrencies: !!checked,
                            },
                          })
                        }
                        disabled={isLoading}
                      />
                      <span>I work with multiple currencies</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={back}
              disabled={step === 0 || isLoading}
            >
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={next} disabled={isLoading}>
                Next
              </Button>
            ) : (
              <Button onClick={handleFinish} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing...
                  </>
                ) : (
                  "Finish"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
