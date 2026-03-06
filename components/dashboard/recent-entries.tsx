'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MOOD_OPTIONS, type MoodEntry } from '@/lib/types'
import { Trash2 } from 'lucide-react'
import { deleteMoodEntry } from '@/app/dashboard/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface RecentEntriesProps {
  entries: MoodEntry[]
}

export function RecentEntries({ entries }: RecentEntriesProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    setDeletingId(id)
    await deleteMoodEntry(id)
    router.refresh()
    setDeletingId(null)
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No mood entries yet. Start tracking your moods today!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Entries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.slice(0, 5).map((entry) => {
          const moodOption = MOOD_OPTIONS.find(m => m.value === entry.mood)
          const entryDate = new Date(entry.entry_date)
          
          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: moodOption?.color }}
              >
                {moodOption?.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{moodOption?.label}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {entryDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                  {entry.study_place && ` • ${entry.study_place}`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(entry.id)}
                disabled={deletingId === entry.id}
              >
                <Trash2 className="w-4 h-4" />
                <span className="sr-only">Delete entry</span>
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
