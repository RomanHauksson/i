'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()
  const redirectTo = window.location.origin + '/auth/callback';
  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={['google', 'facebook', 'twitter']}
      redirectTo={redirectTo}
    />
  )
}