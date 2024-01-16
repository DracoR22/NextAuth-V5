'use server'

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid fileds!' }
    }

    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", {
            email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        
    }
}