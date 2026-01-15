import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useauth } from "@/hooks/useauth";
import { useUserStore } from "@/store/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleCallback } = useauth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      // Check for error from Google OAuth
      const oauthError = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (oauthError) {
        setError(
          errorDescription ||
            oauthError ||
            "Google authentication was cancelled or failed"
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return;
      }

      // Get code from URL query params
      // Google OAuth returns 'code' parameter in the authorization code flow
      const code = searchParams.get("code");

      if (!code) {
        setError("No authentication code received from Google");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return;
      }

      // OAuth codes are single-use and expire quickly, so we must use it immediately
      try {
        await handleGoogleCallback(code);

        // After handleGoogleCallback, user profile is fetched and stored
        // Check the user from store to determine redirect
        const currentUser = useUserStore.getState().user;
        // Only OWNER role users need onboarding, skip for other roles
        if (
          currentUser &&
          !currentUser.businessProfile &&
          currentUser.role === "OWNER"
        ) {
          // Redirect to onboarding if business profile is missing and user is OWNER
          navigate("/onboarding");
        } else {
          // Navigate to dashboard after successful authentication
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Google callback error:", err);
        // Display the actual error message from the API
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to complete Google authentication. Please try again.";
        setError(errorMessage);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    processCallback();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Completing Google Sign In
          </CardTitle>
          <CardDescription>
            Please wait while we complete your authentication...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
          {error ? (
            <>
              <p className="text-destructive text-center">{error}</p>
              <p className="text-sm text-muted-foreground text-center">
                Redirecting to login page...
              </p>
            </>
          ) : (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground text-center">
                Processing your Google authentication...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
};
