import { createClient } from '@/lib/supabase/server'
import { SettingsForm } from '@/components/dashboard/settings-form'
import type { Profile } from '@/lib/types'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your Boon Mood experience</p>
      </div>

      <SettingsForm profile={profile as Profile | null} userEmail={user?.email || ''} />
    </div>
  )
}
