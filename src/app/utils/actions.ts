"use server"
import { z } from "zod";
import { loginSchema } from "./zodSchema";
import { revalidatePath } from "next/cache";
import { requireUser } from "../data/user/require-user";

type ErrorStatus = "ERROR"|"SUCCESS"
interface CreateUserInterface {
  status: ErrorStatus,
  message:string
}

export async function createUser(userData: z.infer<typeof loginSchema>): Promise<CreateUserInterface> {
  // Handle Validation
  try {
    // Validate if user is authenticated
    await requireUser();

    const validatedFields = loginSchema.safeParse(userData);

    if (!validatedFields.success) {
      const error = validatedFields.error.errors[0]['message']
      return {
        status: "ERROR",
        message: error,
      };
    }
    
    // Handle Mutation
    console.log(userData.email, userData.password);
    revalidatePath("/")
    return {
      status: "SUCCESS",
      message: "The user has been created successfully"
    }   
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong"
    }
  }

}