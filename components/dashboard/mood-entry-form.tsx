'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { MoodSelector } from './mood-selector'
import { createMoodEntry, updateMoodEntry } from '@/app/dashboard/actions'
import { STUDY_PLACES, type Mood, type MoodEntry } from '@/lib/types'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface MoodEntryFormProps {
  existingEntry?: MoodEntry | null
  date?: Date
}

export function MoodEntryForm({ existingEntry, date = new Date() }: MoodEntryFormProps) {
  const [mood, setMood] = useState<Mood | undefined>(existingEntry?.mood)
  const [studyPlace, setStudyPlace] = useState(existingEntry?.study_place || '')
  const [note, setNote] = useState(existingEntry?.note || '')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const isEditing = !!existingEntry

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!mood) {
      setError('Please select a mood')
      return
    }

    setIsLoading(true)
    setError(null)

    const entryData = {
      mood,
      entry_date: date.toISOString(),
      study_place: studyPlace || undefined,
      note: note || undefined,
    }

    const result = isEditing
      ? await updateMoodEntry(existingEntry.id, entryData)
      : await createMoodEntry(entryData)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
    
    setTimeout(() => {
      setSuccess(false)
      router.refresh()
    }, 1500)
  }

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          {isEditing ? 'Update Your Mood' : "How are you feeling?"}
        </CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center justify-center gap-2 p-3 text-sm text-accent-foreground bg-accent rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
              {isEditing ? 'Mood updated!' : 'Mood saved!'}
            </div>
          )}

          <div className="space-y-3">
            <Label>Select your mood</Label>
            <MoodSelector value={mood} onChange={setMood} disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="study-place">Where did you study? (Optional)</Label>
            <Select value={studyPlace} onValueChange={setStudyPlace} disabled={isLoading}>
              <SelectTrigger id="study-place">
                <SelectValue placeholder="Select a place" />
              </SelectTrigger>
              <SelectContent>
                {STUDY_PLACES.map((place) => (
                  <SelectItem key={place} value={place}>
                    {place}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Add a note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="What's on your mind?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !mood}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              isEditing ? 'Update Mood' : 'Save Mood'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
