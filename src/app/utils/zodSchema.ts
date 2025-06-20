import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid Email Address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be less than 20 characters"),
});