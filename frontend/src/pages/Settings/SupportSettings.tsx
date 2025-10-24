import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const SupportSettings = () => {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    priority: "",
    category: "",
    description: "",
  });

  const handleSubmitTicket = () => {};
  return (
    <div className="max-w-6xl space-y-6 mx-auto my-4">
      {/* Create Support Ticket */}
      <Card>
        <CardHeader>
          <CardTitle>Create Support Ticket</CardTitle>
          <CardDescription>
            Submit a detailed support request for technical issues or questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                value={ticketForm.subject}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, subject: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={ticketForm.priority}
                onValueChange={(value) =>
                  setTicketForm({ ...ticketForm, priority: value })
                }
              >
                <SelectTrigger>
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
            <Label htmlFor="category">Category</Label>
            <Select
              value={ticketForm.category}
              onValueChange={(value) =>
                setTicketForm({ ...ticketForm, category: value })
              }
            >
              <SelectTrigger>
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
                setTicketForm({ ...ticketForm, description: e.target.value })
              }
            />
          </div>

          <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
        </CardContent>
      </Card>
    </div>
  );
};
