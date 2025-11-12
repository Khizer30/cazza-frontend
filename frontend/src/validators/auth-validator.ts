import {z} from "zod"

export const logInSchema= z.object({
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
})

export const resetPasswordSchema = z.object({
     email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
})
export type LoginData = z.infer<typeof logInSchema>
export type ResetPasswordData=z.infer<typeof resetPasswordSchema>