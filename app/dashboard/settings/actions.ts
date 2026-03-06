'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(data: {
  theme?: 'light' | 'dark'
  mood_colors?: {
    sad: string
    angry: string
    happy: string
    other: string
  }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/settings')
  return { success: true }
}

export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') {
    return { data: null, error: error.message }
  }

  return { data, error: null }
}
