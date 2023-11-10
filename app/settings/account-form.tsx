'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Avatar from './avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { set } from 'react-hook-form'

// TODO: fix sign out button

export default function AccountForm({ session }: { session: Session | null}) {
  
  if (session == null) return <div>Error: authentication session not found.</div>
  
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [balance, setBalance] = useState<number>(0)
  const user = session.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      if (!user) return;
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, website, avatar_url, balance`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setBalance(data.balance)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    website,
    avatar_url,
  }: {
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)
      let { error } = await supabase.from('profiles').update({
        id: user.id as string,
        full_name: fullname,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
        balance
      }).eq('id', user.id);
      if (error) {
        throw error
      }
      alert('Profile updated!')
    } catch (error) {
      console.error(error);
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <div>User not found.</div>
  return (
    <div className="form-widget flex flex-col gap-2">
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, website, avatar_url: url })
        }}
      />
      <div>
        <Label htmlFor="email">email</Label>
        <Input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <Label htmlFor="fullName">full name</Label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="website">website</Label>
        <Input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="balance">balance</Label>
        <Input
          id="balance"
          type="value"
          value={balance || ''}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>

      <div>
        <Button
          className="button primary block"
          onClick={() => updateProfile({ fullname, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'loading...' : 'update'}
        </Button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <Button className="button block" type="submit">
            sign out
          </Button>
        </form>
      </div>
    </div>
  )
}