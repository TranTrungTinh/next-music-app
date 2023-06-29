import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'

const getSongById = async (id: string) => {
  const supabase = createServerComponentClient({
    cookies
  })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.log(error)
  }

  return data || []
}

export default getSongById