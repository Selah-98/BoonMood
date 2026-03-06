'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Home, Calendar, BarChart3, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { signOut } from '@/app/auth/actions'
import type { User } from '@supabase/supabase-js'

interface DashboardNavProps {
  user: User
}

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
  { href: '/dashboard/stats', label: 'Stats', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-5xl w-full mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Boon Mood</span>
          </Link>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn(
                      'gap-2',
                      isActive && 'bg-primary/10 text-primary'
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
            <form action={signOut}>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </form>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
