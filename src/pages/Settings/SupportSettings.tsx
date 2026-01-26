import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { SettingsSidebar } from "@/components/SettingsSidebar";
import { useToast } from "@/components/ToastProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitSupportTicketService } from "@/services/supportService";

// Map form category values to API category values
const categoryMap: Record<string, string> = {
  technical: "Technical Issue",
  billing: "Billing Question",
  feature: "Feature Request",
  integration: "Integration Issue",
  other: "Other"
};

// Map form priority values to API priority values
const priorityMap: Record<string, "LOW" | "MEDIUM" | "HIGH" | "URGENT"> = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
  urgent: "URGENT"
};

export const SupportSettings = () => {
  const { showToast } = useToast();
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    priority: "",
    category: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitTicket = async () => {
    // Validate required fields
    if (!ticketForm.subject.trim()) {
      showToast("Subject is required", "error");
      return;
    }
    if (!ticketForm.description.trim()) {
      showToast("Description is required", "error");
      return;
    }
    if (!ticketForm.priority) {
      showToast("Please select a priority", "error");
      return;
    }
    if (!ticketForm.category) {
      showToast("Please select a category", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        subject: ticketForm.subject.trim(),
        priority: priorityMap[ticketForm.priority] || "MEDIUM",
        category: categoryMap[ticketForm.category] || ticketForm.category,
        description: ticketForm.description.trim()
      };

      const response = await submitSupportTicketService(payload);

      if (response && response.success) {
        showToast(response.message || "Support ticket submitted successfully", "success");
        // Reset form after successful submission
        setTicketForm({
          subject: "",
          priority: "",
          category: "",
          description: ""
        });
      } else {
        showToast(response.message || "Failed to submit support ticket", "error");
      }
    } catch (error: unknown) {
      console.error("Submit support ticket error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to submit support ticket";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="h-full overflow-hidden flex">
      <SettingsSidebar />
      <div className="flex-1 h-full overflow-y-auto">
        <div className="max-w-[1400px] w-full space-y-6 mx-auto my-4 px-6 md:px-8 lg:px-12 py-4 md:py-6">
          {/* Create Support Ticket */}
          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
              <CardDescription>Submit a detailed support request for technical issues or questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select
                    value={ticketForm.priority}
                    onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={ticketForm.category}
                  onValueChange={(value) => setTicketForm({ ...ticketForm, category: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="integration">Integration Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                  value={ticketForm.description}
                  onChange={(e) =>
                    setTicketForm({
                      ...ticketForm,
                      description: e.target.value
                    })
                  }
                />
              </div>

              <Button onClick={handleSubmitTicket} disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Ticket"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
