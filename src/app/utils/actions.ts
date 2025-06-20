"use server"
import { z } from "zod";
import { loginSchema } from "./zodSchema";

export async function createUser(userData: z.infer<typeof loginSchema>) {
  // Handle Validation
  const validatedFields = loginSchema.safeParse(userData);

  if (!validatedFields.success) {
    const error = validatedFields.error.errors[0]['message']
    return {
      status: "error",
      message: error,
    };
  }
  
  // Handle Mutation
  console.log(userData.email, userData.password);
  return {
    status: "success",
    message: "The user has been created successfully"
  }
}