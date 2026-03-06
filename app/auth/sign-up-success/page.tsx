import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Heart } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-accent-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription className="text-base">
            We've sent you a confirmation link to verify your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click the link in your email to activate your account and start tracking your moods with Boon Mood.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/login">Back to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
