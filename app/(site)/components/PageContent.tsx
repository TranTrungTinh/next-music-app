'use client'

import SongItem from "@/components/SongItem";
import { Song } from "@/types";
import { useCallback } from "react";

interface PageContentProps {
  songs: Song[]
}

const PageContent: React.FC<PageContentProps> = ({
  songs
}) => {

  const onPlay = useCallback((id: string) => {
    console.log(id)
  }, [])

  if (!songs.length) {
    return (
      <div className="mt-4 text-neutral-400">
        No songs available.
      </div>
    )
  }

  return (
    <div
      className=" 
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-4
        mt-4 
      "
    >
      {songs.map((song) => (
        <SongItem
          onClick={(id) => onPlay(id)}
          key={song.id}
          data={song}
        />
      ))}
    </div>
  );
}
 
export default PageContent;