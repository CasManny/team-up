import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().min(1, "Required").email(),
    password: z.string().min(8, "Minimum of 8 characters required").max(256),
})

export const signupSchema = z.object({
    email: z.string().trim().min(1, "Required").email(),
    name: z.string().min(1, "Required"),
    password: z.string().min(8, "Minimum of 8 characters required").max(256),
})