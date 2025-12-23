import { z } from "zod";

export const logInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must not exceed 32 characters" }),
});

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must not exceed 32 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Please confirm your password" }),
    invitationId: z.string().optional(),
    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const setNewPasswordSchema = z
  .object({
    token: z.string().trim().min(1, { message: "Token is required" }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must not exceed 32 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginData = z.infer<typeof logInSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type SetNewPasswordData = z.infer<typeof setNewPasswordSchema>;
