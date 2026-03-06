import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito'
});

export const metadata: Metadata = {
  title: 'Boon Mood - Your Personal Mood Diary',
  description: 'Track your daily moods, study patterns, and gain insights into your emotional well-being with Boon Mood.',
  generator: 'v0.app',
  keywords: ['mood tracker', 'diary', 'mental health', 'emotions', 'well-being'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF8F0' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
