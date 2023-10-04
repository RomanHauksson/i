import { Sidebar } from '@/components/sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
 
const spaceGrotesk = Space_Grotesk({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "I'm",
  description: 'An app for investments in people, not companies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="max-w-5xl gap-24 p-6 flex items-start m-auto">
        <Sidebar />
        {children}
      </body>
    </html>
  )
}