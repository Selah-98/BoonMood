import { createClient } from '@/lib/supabase/server'
import { MoodCalendar } from '@/components/dashboard/mood-calendar'
import type { MoodEntry } from '@/lib/types'

export default async function CalendarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get all entries for the calendar (last 12 months)
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 12)

  const { data: entries } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', user?.id)
    .gte('entry_date', startDate.toISOString())
    .order('entry_date', { ascending: false })

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">View your mood history at a glance</p>
      </div>

      <MoodCalendar entries={(entries || []) as MoodEntry[]} />
    </div>
  )
}
