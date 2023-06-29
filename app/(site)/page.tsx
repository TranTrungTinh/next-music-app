import Header from '@/components/Header'
// import Image from 'next/image'
import ListItem from '@/components/ListItem'
import getSongs from '../../actions/getSongs'
import PageContent from './components/PageContent'

// const list = [
//   {
//     name: 'Liked Songs',
//     image: "https://misc.scdn.co/liked-songs/liked-songs-64.png",
//     author: 'Tinh Tran'
//   },
//   {
//     name: 'champagne & cokeasdadsadsadsadasdsa asdasdasdas',
//     image: "https://i.scdn.co/image/ab67706c0000f8e481bcb4ae4198afa5a6135ff0",
//     author: 'Ilke Kartal'
//   },
//   {
//     name: 'My Playlist #1',
//     author: 'Tinh Tran'
//   },
//   {
//     name: 'Liked Songs',
//     image: "https://misc.scdn.co/liked-songs/liked-songs-64.png",
//     author: 'Tinh Tran'
//   },
//   {
//     name: 'champagne & cokeasdadsadsadsadasdsa asdasdasdas',
//     image: "https://i.scdn.co/image/ab67706c0000f8e481bcb4ae4198afa5a6135ff0",
//     author: 'Ilke Kartal'
//   },
//   {
//     name: 'My Playlist #1',
//     author: 'Antonio'
//   },
// ]

// const songs = [
//   {
//     name: 'Wow.',
//     image: "https://media.pitchfork.com/photos/629a1d0bec6d212a5b6b705e/1:1/w_600/Post-Malone-Hollywoods-Bleeding.jpg",
//     author: 'Post Malone'
//   },
//   {
//     name: 'Wolves',
//     image: "https://i1.sndcdn.com/artworks-000157549168-m5jgfu-t500x500.jpg",
//     author: 'Kanye West'
//   },
//   {
//     name: 'Till I Collapse',
//     image: 'https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4',
//     author: 'Eminem'
//   },
//   {
//     name: 'Hate It Or Love It',
//     image: 'https://geo-media.beatsource.com/image_size/500x500/9/a/9/9a9fb40c-9926-4f65-b358-7b10307e2f23.jpg',
//     author: 'The Game'
//   },
// ]
export const revalidate = 0

export default async function Home() {
  const songs = await getSongs()

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div
            className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'
          >
            <ListItem 
              name="Liked Songs" 
              image="/images/liked.png" 
              href="liked" 
            />
          </div>
        </div>
      </Header>
      
      <div className="mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
          <p className="text-sm text-neutral-400 cursor-pointer hover:text-neutral-200 transition font-semibold">Show All</p>
        </div>
        <PageContent songs={songs} />
      </div>
      
      {/* <div className="mb-2 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest playlists</h1>
          <p className="text-sm text-neutral-400 cursor-pointer hover:text-neutral-200 transition font-semibold">Show All</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
          {list.map((item) => (
            <SongItem key={item.name} {...item} />
          ))}
        </div>
      </div> */}

    </div>
  )
}
