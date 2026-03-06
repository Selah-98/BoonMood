import { createClient } from '@/lib/supabase/server'
import { MoodEntryForm } from '@/components/dashboard/mood-entry-form'
import { RecentEntries } from '@/components/dashboard/recent-entries'
import type { MoodEntry } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get today's entry
  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString()
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString()

  const { data: todayEntry } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', user?.id)
    .gte('entry_date', startOfDay)
    .lt('entry_date', endOfDay)
    .single()

  // Get recent entries
  const { data: recentEntries } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', user?.id)
    .order('entry_date', { ascending: false })
    .limit(10)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">How are you feeling today?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MoodEntryForm existingEntry={todayEntry as MoodEntry | null} />
        <RecentEntries entries={(recentEntries || []) as MoodEntry[]} />
      </div>
    </div>
  )
}
