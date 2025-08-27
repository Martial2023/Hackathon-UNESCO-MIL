import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.DATABASE_URL
})

export const { signIn, signUp, signOut, useSession } = createAuthClient() 