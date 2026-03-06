'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type MoodEntry } from '@/lib/types'
import { MapPin } from 'lucide-react'

interface PlaceChartProps {
  entries: MoodEntry[]
}

export function PlaceChart({ entries }: PlaceChartProps) {
  // Calculate place distribution
  const placeCounts = entries.reduce((acc, entry) => {
    if (entry.study_place) {
      acc[entry.study_place] = (acc[entry.study_place] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  const sortedPlaces = Object.entries(placeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const total = Object.values(placeCounts).reduce((a, b) => a + b, 0) || 1

  const colors = [
    'var(--mood-happy)',
    'var(--mood-sad)',
    'var(--mood-angry)',
    'var(--mood-other)',
    'var(--primary)',
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Study Places</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedPlaces.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No study places recorded yet. Add where you study to see insights!
          </p>
        ) : (
          sortedPlaces.map(([place, count], index) => {
            const percentage = Math.round((count / total) * 100)

            return (
              <div key={place} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{place}</span>
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
                      backgroundColor: colors[index % colors.length],
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
