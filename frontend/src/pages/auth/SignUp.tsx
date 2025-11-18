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
import { Eye, EyeOff, Mail, User, Lock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/validators/auth-validator";
import type { SignUpData } from "@/validators/auth-validator";
import { useauth } from "@/hooks/useauth";
import { getInvitationService } from "@/services/teamService";
import { useToast } from "@/components/ToastProvider";
import { AxiosError } from "axios";

export const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp } = useauth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingInvitation, setLoadingInvitation] = useState(false);
  const [isInvitedUser, setIsInvitedUser] = useState(false);

  const invitationId = searchParams.get("invitation");

  const {
    register,
    handleSubmit,
    formState: { errors },
      control,
    setValue,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      invitationId: invitationId || "",
      acceptedTerms: false,
    },
  });



  // Fetch invitation details if invitation ID is present
  useEffect(() => {
    const fetchInvitation = async () => {
      if (invitationId) {
        setLoadingInvitation(true);
        try {
          const response = await getInvitationService(invitationId);
          if (response && response.success && response.data) {
            const invitationEmail = response.data.email;
            // Set email and invitationId in the form
            setValue("email", invitationEmail, { shouldValidate: false });
            setValue("invitationId", invitationId, { shouldValidate: false });
            setIsInvitedUser(true);
            // Do NOT auto-submit - user must fill form and submit manually
          } else {
            showToast(response.message || "Invalid invitation", "error");
            // Remove invalid invitation from URL
            navigate("/signup", { replace: true });
          }
        } catch (error: unknown) {
          console.error("Fetch invitation error:", error);
          if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || "Invalid or expired invitation";
            showToast(errorMessage, "error");
          } else if (error instanceof Error) {
            showToast(error.message, "error");
          } else {
            showToast("Failed to load invitation details", "error");
          }
          // Remove invalid invitation from URL
          navigate("/signup", { replace: true });
        } finally {
          setLoadingInvitation(false);
        }
      }
    };

    fetchInvitation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationId]);

  const onSubmit = async (data: SignUpData) => {
    setLoading(true);
    try {
      const { confirmPassword, acceptedTerms, invitationId, ...signupPayload } = data;
      // Only include invitationId if it has a value
      const payload = invitationId && invitationId.trim() 
        ? { ...signupPayload, invitationId: invitationId.trim() }
        : signupPayload;
      await signUp(payload);
      // Optionally navigate to login or show success message
      // navigate("/login");
    } catch (err) {
      // Error is already handled in the useauth hook
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
          <CardDescription>Start your portal in minutes</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              //   onClick={() => handleOAuthSignIn("google")}
              disabled={loading}
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
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                {loadingInvitation ? (
                  <div className="flex items-center pl-10 h-10 border border-input rounded-md bg-background">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">Loading invitation...</span>
                  </div>
                ) : (
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className={`pl-10 ${isInvitedUser ? "bg-muted cursor-not-allowed" : ""}`}
                    disabled={loading || isInvitedUser}
                  />
                )}
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
              {isInvitedUser && !errors.email && (
                <p className="text-xs text-muted-foreground">
                  Email is pre-filled from your team invitation
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="pl-10 pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className="pl-10 pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Controller
                name="acceptedTerms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                )}
              />
              <Label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-wrap"
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
            {errors.acceptedTerms && (
              <p className="text-sm text-destructive">{errors.acceptedTerms.message}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-primary hover:underline font-medium"
                disabled={loading}
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
