'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MOOD_OPTIONS, type MoodEntry, type Mood } from '@/lib/types'

interface MoodChartProps {
  entries: MoodEntry[]
}

export function MoodChart({ entries }: MoodChartProps) {
  // Calculate mood distribution
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1
    return acc
  }, {} as Record<Mood, number>)

  const total = entries.length || 1 // Avoid division by zero

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Mood Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No data yet. Start tracking your moods to see your distribution!
          </p>
        ) : (
          MOOD_OPTIONS.map((option) => {
            const count = moodCounts[option.value] || 0
            const percentage = Math.round((count / total) * 100)

            return (
              <div key={option.value} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {count} ({percentage}%)
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: option.color,
                    }}
                  />
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
