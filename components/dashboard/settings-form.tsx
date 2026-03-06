'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { signOut } from '@/app/auth/actions'
import { updateProfile } from '@/app/dashboard/settings/actions'
import { MOOD_OPTIONS, type Profile } from '@/lib/types'
import { Sun, Moon, Loader2, LogOut, User, Palette, CheckCircle2 } from 'lucide-react'

interface SettingsFormProps {
  profile: Profile | null
  userEmail: string
}

export function SettingsForm({ profile, userEmail }: SettingsFormProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [moodColors, setMoodColors] = useState(profile?.mood_colors || {
    sad: '#A3CEF1',
    angry: '#F7A1A1',
    happy: '#A8E6CF',
    other: '#CBA0E3',
  })

  async function handleThemeChange(checked: boolean) {
    const newTheme = checked ? 'dark' : 'light'
    setTheme(newTheme)
    
    await updateProfile({ theme: newTheme })
  }

  async function handleColorChange(mood: keyof typeof moodColors, color: string) {
    const newColors = { ...moodColors, [mood]: color }
    setMoodColors(newColors)
  }

  async function saveColors() {
    setIsLoading(true)
    await updateProfile({ mood_colors: moodColors })
    setIsLoading(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Account Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5" />
            Account
          </CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
          <form action={signOut}>
            <Button variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sun className="w-5 h-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={handleThemeChange}
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Colors Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Palette className="w-5 h-5" />
            Mood Colors
          </CardTitle>
          <CardDescription>Customize your mood indicator colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success && (
            <div className="flex items-center gap-2 p-3 text-sm text-accent-foreground bg-accent rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
              Colors saved!
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            {MOOD_OPTIONS.map((option) => (
              <div key={option.value} className="space-y-2">
                <Label className="flex items-center gap-2">
                  <span>{option.icon}</span>
                  {option.label}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={moodColors[option.value]}
                    onChange={(e) => handleColorChange(option.value, e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={moodColors[option.value]}
                    onChange={(e) => handleColorChange(option.value, e.target.value)}
                    className="font-mono text-sm"
                    maxLength={7}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button onClick={saveColors} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Colors'
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Note: Color changes will apply to new mood entries.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
