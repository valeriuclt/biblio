// app/actions/user.ts
'use server'

import { db } from "@/database/drizzle"
import { users } from "@/database/schema" 
import { eq } from "drizzle-orm"

export async function getUserProfile(email: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    
    return { user, error: null }
  } catch (error) {
    return { 
      user: null, 
      error: 'Failed to fetch user profile' 
    }
  }
}