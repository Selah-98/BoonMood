'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { MOOD_OPTIONS, type Mood } from '@/lib/types'

interface MoodSelectorProps {
  value?: Mood
  onChange: (mood: Mood) => void
  disabled?: boolean
}

export function MoodSelector({ value, onChange, disabled }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MOOD_OPTIONS.map((option) => {
        const isSelected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            disabled={disabled}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all',
              'hover:scale-105 active:scale-95',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
              isSelected
                ? 'border-primary shadow-lg'
                : 'border-transparent bg-card hover:border-border'
            )}
            style={{
              backgroundColor: isSelected ? option.color : undefined,
            }}
          >
            <span className="text-4xl">{option.icon}</span>
            <span className={cn(
              'font-medium text-sm',
              isSelected ? 'text-foreground' : 'text-muted-foreground'
            )}>
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
