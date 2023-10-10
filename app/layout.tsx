"use client";

import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { useState } from 'react'
import { LandingPage } from '@/components/landingPage'
import { Sidebar } from '@/components/sidebar'
import { UserContextProvider } from './authentication';
import supabase from "../supabase"
 
const spaceGrotesk = Space_Grotesk({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

// export const metadata: Metadata = {
//   title: "I'm",
//   description: 'An app for investments in people, not companies.',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState(null);
  const onUserStateChange = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body>
        <UserContextProvider>
          {isLoggedIn ? 
            <div className="max-w-5xl gap-16 p-6 flex items-start m-auto">
                <Sidebar />
                {children}
            </div>
            : <LandingPage />}
        </UserContextProvider>
      </body>
    </html>
  )
}