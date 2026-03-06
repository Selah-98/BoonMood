'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Mood, MoodEntry } from '@/lib/types'

export async function createMoodEntry(data: {
  mood: Mood
  entry_date: string
  study_place?: string
  note?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase.from('mood_entries').insert({
    user_id: user.id,
    mood: data.mood,
    entry_date: data.entry_date,
    study_place: data.study_place || null,
    note: data.note || null,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/calendar')
  revalidatePath('/dashboard/stats')
  
  return { success: true }
}

export async function updateMoodEntry(
  id: string,
  data: {
    mood?: Mood
    study_place?: string
    note?: string
  }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('mood_entries')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/calendar')
  revalidatePath('/dashboard/stats')
  
  return { success: true }
}

export async function deleteMoodEntry(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('mood_entries')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/calendar')
  revalidatePath('/dashboard/stats')
  
  return { success: true }
}

export async function getMoodEntries(startDate?: string, endDate?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'Not authenticated' }
  }

  let query = supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('entry_date', { ascending: false })

  if (startDate) {
    query = query.gte('entry_date', startDate)
  }
  if (endDate) {
    query = query.lte('entry_date', endDate)
  }

  const { data, error } = await query

  if (error) {
    return { data: null, error: error.message }
  }

  return { data: data as MoodEntry[], error: null }
}

export async function getTodayMoodEntry() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'Not authenticated' }
  }

  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString()

  const { data, error } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', user.id)
    .gte('entry_date', startOfDay)
    .lt('entry_date', endOfDay)
    .single()

  if (error && error.code !== 'PGRST116') {
    return { data: null, error: error.message }
  }

  return { data: data as MoodEntry | null, error: null }
}
