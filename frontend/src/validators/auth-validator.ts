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
      .min(2, { message: "First name must be at least 2 characters" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Only alphabets are allowed" }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Only alphabets are allowed" }),
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

// Onboarding validation schemas - split by step for granular validation
export const businessInfoSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(1, { message: "Business name is required" })
    .min(2, { message: "Business name must be at least 2 characters" })
    .max(100, { message: "Business name must not exceed 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Business name can only contain letters and spaces" }),
  businessEntityType: z
    .string()
    .min(1, { message: "Please select a business entity type" }),
  annualRevenueBand: z
    .string()
    .min(1, { message: "Please select an annual revenue band" }),
});

export const marketplacesSchema = z.object({
  marketplaces: z
    .array(z.string())
    .min(1, { message: "Please select at least one marketplace" }),
});

export const toolsSchema = z.object({
  tools: z
    .array(z.string())
    .min(1, { message: "Please select at least one tool" }),
  techStack: z.object({
    useXero: z.boolean(),
    multipleCurrencies: z.boolean(),
  }),
});

// Full onboarding schema for final validation
export const onboardingSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(1, { message: "Business name is required" })
    .min(2, { message: "Business name must be at least 2 characters" })
    .max(100, { message: "Business name must not exceed 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Business name can only contain letters and spaces" }),
  businessEntityType: z
    .string()
    .min(1, { message: "Please select a business entity type" }),
  annualRevenueBand: z
    .string()
    .min(1, { message: "Please select an annual revenue band" }),
  marketplaces: z
    .array(z.string())
    .min(1, { message: "Please select at least one marketplace" }),
  tools: z.array(z.string()),
  techStack: z.object({
    useXero: z.boolean(),
    multipleCurrencies: z.boolean(),
  }),
});

export type LoginData = z.infer<typeof logInSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type SetNewPasswordData = z.infer<typeof setNewPasswordSchema>;
export type BusinessInfoData = z.infer<typeof businessInfoSchema>;
export type MarketplacesData = z.infer<typeof marketplacesSchema>;
export type ToolsData = z.infer<typeof toolsSchema>;
export type OnboardingData = z.infer<typeof onboardingSchema>;
