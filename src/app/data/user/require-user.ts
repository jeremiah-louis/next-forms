import { auth } from '@clerk/nextjs/server'

export async function requireUser():Promise<string | null>{
    // This returns user session
    const { userId } = await auth()

    if (!userId){
     throw new Error("Something went wrong")
    }
    return userId
}