'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MOOD_OPTIONS, type MoodEntry } from '@/lib/types'
import { cn } from '@/lib/utils'

interface MoodCalendarProps {
  entries: MoodEntry[]
}

export function MoodCalendar({ entries }: MoodCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  // Create a map of date -> mood entry
  const entryMap = new Map<string, MoodEntry>()
  entries.forEach((entry) => {
    const date = new Date(entry.entry_date)
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    entryMap.set(key, entry)
  })

  function goToPreviousMonth() {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  function goToNextMonth() {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  function goToToday() {
    setCurrentDate(new Date())
  }

  const today = new Date()
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Generate calendar days
  const calendarDays: (number | null)[] = []
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{monthName}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="w-4 h-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="w-4 h-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const dateKey = `${year}-${month}-${day}`
            const entry = entryMap.get(dateKey)
            const moodOption = entry ? MOOD_OPTIONS.find(m => m.value === entry.mood) : null
            
            const isToday = isCurrentMonth && day === today.getDate()
            const isFuture = new Date(year, month, day) > today

            return (
              <div
                key={day}
                className={cn(
                  'aspect-square rounded-lg flex flex-col items-center justify-center relative',
                  'text-sm transition-colors',
                  isToday && 'ring-2 ring-primary',
                  isFuture && 'opacity-40',
                  !entry && !isFuture && 'bg-muted/50',
                )}
                style={{
                  backgroundColor: moodOption?.color || undefined,
                }}
              >
                <span className={cn(
                  'font-medium',
                  moodOption && 'text-foreground'
                )}>
                  {day}
                </span>
                {moodOption && (
                  <span className="text-xs">{moodOption.icon}</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t">
          {MOOD_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: option.color }}
              />
              <span className="text-xs text-muted-foreground">{option.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
