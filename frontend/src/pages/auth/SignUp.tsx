import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Separator } from "@/components/ui/separator";

import { AlertCircle, Eye, EyeOff, Mail } from "lucide-react";
import React from "react";

export const SignUp = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
          <CardDescription>Start your portal in minutes</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* {error && !emailError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )} */}

          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              //   onClick={() => handleOAuthSignIn("google")}
              //   disabled={loading}
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              //   onClick={() => handleOAuthSignIn("azure")}
              //   disabled={loading}
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11.4 24H0L8.87 0h6.54zM21.45 0H12L23.16 24H24z"
                />
              </svg>
              Continue with Microsoft
            </Button>
          </div>

          {/* {!invitationToken && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
          )} */}

          <form onSubmit={undefined} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                {/* <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" /> */}
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  //   value={name}
                  //   onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                  //   disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  //   disabled={loading || !!invitationDetails}
                />
              </div>
              {/* {emailError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{emailError}</AlertDescription>
                </Alert>
              )} */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" /> */}
                <Input
                  id="password"
                  //   type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  //   value={password}
                  //   onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  //   disabled={loading}
                />
                <button
                  type="button"
                  //   onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  //   disabled={loading}
                >
                  {/* {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )} */}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" /> */}
                <Input
                  id="confirmPassword"
                  //   type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  //   value={confirmPassword}
                  onChange={(e) => {
                    // setConfirmPassword(e.target.value);
                    // setPasswordMatchError(null);
                  }}
                  className="pl-10 pr-10"
                  required
                  //   disabled={loading}
                />
                <button
                  type="button"
                  //   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  //   disabled={loading}
                >
                  {/* {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )} */}
                </button>
              </div>
              {/* {passwordMatchError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{passwordMatchError}</AlertDescription>
                </Alert>
              )} */}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                // checked={acceptedTerms}
                // onCheckedChange={(checked) =>
                //   setAcceptedTerms(checked as boolean)
                // }
                required
              />
              <Label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By signing up, you agree to our{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              //   disabled={loading || !acceptedTerms}
            >
              {/* {loading ? "Creating account..." : "Create account"} */}
            </Button>
          </form>

          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                // onClick={() => navigate("/auth/signin")}
                className="text-primary hover:underline font-medium"
                // disabled={loading}
              >
                Sign in
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
