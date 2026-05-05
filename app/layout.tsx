import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Baer and Son Publishing',
  description: 'A family imprint built for authors who have something real to say. Transparent, personal publishing through Amazon KDP.',
  keywords: 'self publishing, Amazon KDP, family publishing, independent author, book publishing',
  openGraph: {
    title: 'Baer and Son Publishing',
    description: 'Built on family. Built for authors who have something real to say.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
