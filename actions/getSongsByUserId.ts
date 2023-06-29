import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'

import { Song } from "@/types"

const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  })

  const { data: dataSession, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    console.info('sessionError error', sessionError)
    return []
  }

  const { data, error } = await supabase
  .from('songs')
  .select('*')
  .eq('user_id', dataSession.session?.user.id)
  .order('created_at', { ascending: false })

  if (error) {
    console.info('songs error', error)
  }

  return data || []
}

export default getSongsByUserId