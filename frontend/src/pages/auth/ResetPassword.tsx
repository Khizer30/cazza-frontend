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
import { useauth } from "@/hooks/useauth";
import {
  resetPasswordSchema,
  type ResetPasswordData,
} from "@/validators/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useauth();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ResetPasswordData) => {
    forgotPassword(data);
  };
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  className="pl-9"
                />
              </div>
              {errors.email && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.email.message}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Email"}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/signin")}
              className="text-sm text-muted-foreground hover:text-foreground"
              disabled={isLoading}
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
