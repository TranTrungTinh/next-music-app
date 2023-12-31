'use client'
import LikeButton from "~/components/LikeButton"
import MediaItem from "~/components/MediaItem"
import { useUser } from "~/hooks/useUser"
import { Song } from "~/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface FavoriteContentProps {
  songs: Song[]
}

const FavoriteContent: React.FC<FavoriteContentProps> = ({
  songs
}) => {

  const router = useRouter()
  const { isLoading, user } = useUser()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
    }
  }, [isLoading, user, router])
  
  if (!songs.length) {
    return (
      <div 
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        No favorite songs.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default FavoriteContent