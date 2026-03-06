import { createClient } from '@/lib/supabase/server'
import { MoodStats } from '@/components/dashboard/mood-stats'
import { MoodChart } from '@/components/dashboard/mood-chart'
import { PlaceChart } from '@/components/dashboard/place-chart'
import type { MoodEntry } from '@/lib/types'

export default async function StatsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: entries } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', user?.id)
    .order('entry_date', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Statistics</h1>
        <p className="text-muted-foreground">Insights into your mood patterns</p>
      </div>

      <div className="space-y-6">
        <MoodStats entries={(entries || []) as MoodEntry[]} />
        
        <div className="grid md:grid-cols-2 gap-6">
          <MoodChart entries={(entries || []) as MoodEntry[]} />
          <PlaceChart entries={(entries || []) as MoodEntry[]} />
        </div>
      </div>
    </div>
  )
}
