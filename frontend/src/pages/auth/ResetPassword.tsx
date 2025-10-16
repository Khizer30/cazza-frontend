import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AlertCircle, Mail, ArrowLeft } from "lucide-react";

export const ResetPassword = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Reset Your Password
          </CardTitle>
          <CardDescription>
            Enter your email to receive reset instructions
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )} */}

          <form onSubmit={undefined} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  required
                  //   disabled={loading}
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={false}>
              {false ? "Sending..." : "Send Reset Email"}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="ghost"
              //   onClick={() => navigate('/auth')}
              className="text-sm text-muted-foreground hover:text-foreground"
              //   disabled={loading}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
