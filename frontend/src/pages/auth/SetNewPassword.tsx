import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft } from "lucide-react";


export const SetNewPassword = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Set New Password
          </CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
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
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                {/* <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> */}
                <Input
                  id="newPassword"
                //   type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                //   value={newPassword}
                //   onChange={(e) => setNewPassword(e.target.value)}
                  required
                //   disabled={loading}
                  className="pl-9 pr-9"
                  minLength={6}
                />
                <button
                  type="button"
                //   onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                //   disabled={loading}
                >
                  {/* {showNewPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )} */}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                {/* <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> */}
                <Input
                  id="confirmPassword"
                //   type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                //   value={confirmPassword}
                //   onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                //   disabled={loading}
                  className="pl-9 pr-9"
                  minLength={6}
                />
                <button
                  type="button"
                //   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                //   disabled={loading}
                >
                  {/* {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )} */}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={false}>
              {false ? "Updating Password..." : "Update Password"}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="ghost"
            //   onClick={() => navigate("/auth")}
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
