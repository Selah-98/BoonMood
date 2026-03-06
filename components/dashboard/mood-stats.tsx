'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MOOD_OPTIONS, type MoodEntry, type Mood } from '@/lib/types'
import { TrendingUp, Calendar, Award, MapPin } from 'lucide-react'

interface MoodStatsProps {
  entries: MoodEntry[]
}

export function MoodStats({ entries }: MoodStatsProps) {
  // Calculate stats
  const totalEntries = entries.length
  
  // Mood distribution
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1
    return acc
  }, {} as Record<Mood, number>)

  // Most common mood
  const mostCommonMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]
  const mostCommonMoodOption = mostCommonMood 
    ? MOOD_OPTIONS.find(m => m.value === mostCommonMood[0])
    : null

  // Streak calculation
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()
  )
  
  let currentStreak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  for (let i = 0; i < sortedEntries.length; i++) {
    const entryDate = new Date(sortedEntries[i].entry_date)
    entryDate.setHours(0, 0, 0, 0)
    
    const expectedDate = new Date(today)
    expectedDate.setDate(expectedDate.getDate() - i)
    
    if (entryDate.getTime() === expectedDate.getTime()) {
      currentStreak++
    } else {
      break
    }
  }

  // Most common study place
  const placeCounts = entries.reduce((acc, entry) => {
    if (entry.study_place) {
      acc[entry.study_place] = (acc[entry.study_place] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  const mostCommonPlace = Object.entries(placeCounts).sort((a, b) => b[1] - a[1])[0]

  // This month's entries
  const thisMonth = new Date()
  const thisMonthEntries = entries.filter(entry => {
    const date = new Date(entry.entry_date)
    return date.getMonth() === thisMonth.getMonth() && 
           date.getFullYear() === thisMonth.getFullYear()
  })

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Calendar className="w-5 h-5" />}
        title="Total Entries"
        value={totalEntries.toString()}
        subtitle={`${thisMonthEntries.length} this month`}
        color="bg-[var(--mood-sad)]"
      />
      <StatCard
        icon={<TrendingUp className="w-5 h-5" />}
        title="Current Streak"
        value={`${currentStreak} day${currentStreak !== 1 ? 's' : ''}`}
        subtitle={currentStreak > 0 ? 'Keep it up!' : 'Start today!'}
        color="bg-[var(--mood-happy)]"
      />
      <StatCard
        icon={<Award className="w-5 h-5" />}
        title="Top Mood"
        value={mostCommonMoodOption?.label || 'N/A'}
        subtitle={mostCommonMood ? `${mostCommonMood[1]} times` : 'No data yet'}
        color="bg-[var(--mood-angry)]"
        emoji={mostCommonMoodOption?.icon}
      />
      <StatCard
        icon={<MapPin className="w-5 h-5" />}
        title="Favorite Spot"
        value={mostCommonPlace?.[0] || 'N/A'}
        subtitle={mostCommonPlace ? `${mostCommonPlace[1]} visits` : 'No data yet'}
        color="bg-[var(--mood-other)]"
      />
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
  color,
  emoji,
}: {
  icon: React.ReactNode
  title: string
  value: string
  subtitle: string
  color: string
  emoji?: string
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3`}>
          {emoji ? <span className="text-xl">{emoji}</span> : icon}
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{title}</p>
        <p className="text-xl font-bold mt-1">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
