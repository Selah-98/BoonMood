import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Calendar, BarChart3, Settings, Smile, CloudSun, BookOpen } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Your Personal Mood Companion</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Track Your Moods,<br />
            <span className="text-primary">Understand Yourself</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Boon Mood helps you record your daily emotions, track study patterns, and gain valuable insights into your emotional well-being.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth/sign-up">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything You Need</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Simple yet powerful features to help you understand your emotional patterns
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Smile className="w-8 h-8" />}
              title="Quick Mood Entry"
              description="Record your mood in seconds with our intuitive interface"
              color="bg-[var(--mood-happy)]"
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8" />}
              title="Calendar View"
              description="Visualize your moods across days and months"
              color="bg-[var(--mood-sad)]"
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Statistics"
              description="Gain insights with detailed mood analytics"
              color="bg-[var(--mood-angry)]"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Study Tracking"
              description="Connect your moods with study locations"
              color="bg-[var(--mood-other)]"
            />
          </div>
        </div>
      </section>

      {/* Mood Preview Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Four Simple Moods</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Express how you're feeling with our carefully designed mood categories
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <MoodPreview emoji="😊" label="Happy" color="bg-[var(--mood-happy)]" />
            <MoodPreview emoji="😢" label="Sad" color="bg-[var(--mood-sad)]" />
            <MoodPreview emoji="😠" label="Angry" color="bg-[var(--mood-angry)]" />
            <MoodPreview emoji="😐" label="Other" color="bg-[var(--mood-other)]" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users who are taking control of their emotional well-being
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/auth/sign-up">Create Your Free Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-semibold">Boon Mood</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Made with care for your well-being
          </p>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-4 text-foreground`}>
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function MoodPreview({ 
  emoji, 
  label, 
  color 
}: { 
  emoji: string
  label: string
  color: string
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`w-20 h-20 ${color} rounded-2xl flex items-center justify-center text-4xl shadow-sm`}>
        {emoji}
      </div>
      <span className="font-medium">{label}</span>
    </div>
  )
}
