import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import Sidebar from '@/components/sidebar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "I'm",
  description: 'Invest in people, not companies.',
}

const spaceGrotesk = Space_Grotesk({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();

  // if (data.session == null) {
  //   return <div>Error: not logged in.</div>;
  // }

  return (
    <html lang="en">
      <body className={spaceGrotesk.className + " max-w-5xl gap-16 p-6 flex justify-center m-auto"}>
          <Sidebar />
          <div className="grow">
            {children}
          </div>
      </body>
    </html>
  )
}