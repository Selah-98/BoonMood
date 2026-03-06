export type Mood = 'sad' | 'angry' | 'happy' | 'other'

export interface MoodEntry {
  id: string
  user_id: string
  mood: Mood
  entry_date: string
  study_place: string | null
  note: string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  theme: 'light' | 'dark'
  mood_colors: {
    sad: string
    angry: string
    happy: string
    other: string
  }
  created_at: string
  updated_at: string
}

export interface MoodOption {
  value: Mood
  label: string
  icon: string
  color: string
}

export const MOOD_OPTIONS: MoodOption[] = [
  { value: 'happy', label: 'Happy', icon: '😊', color: 'var(--mood-happy)' },
  { value: 'sad', label: 'Sad', icon: '😢', color: 'var(--mood-sad)' },
  { value: 'angry', label: 'Angry', icon: '😠', color: 'var(--mood-angry)' },
  { value: 'other', label: 'Other', icon: '😐', color: 'var(--mood-other)' },
]

export const STUDY_PLACES = [
  'Library',
  'Home',
  'Cafe',
  'School',
  'Office',
  'Park',
  'Other',
]
