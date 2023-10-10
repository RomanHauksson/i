import { createServerComponentClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'

// export const serverSupabase = createServerComponentClient({ cookies });
export const clientSupabase = createClientComponentClient();