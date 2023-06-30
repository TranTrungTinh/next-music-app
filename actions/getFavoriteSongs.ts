import { Song } from "~/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'

const getFavoriteSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies
  })

  const {
    data: { session } 
  } = await supabase.auth.getSession()

  const { data } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user.id)
    .order('created_at', { ascending: false })

  if (!data) {
    return []
  }

  return data.map((item) => {
    return { ...item.songs }
  })
}

export default getFavoriteSongs