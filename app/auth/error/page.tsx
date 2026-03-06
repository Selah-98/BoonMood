import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          <CardDescription className="text-base">
            Something went wrong during authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please try again or contact support if the problem persists.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/auth/login">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
