import './globals.css'
// TODO: External dependencies
import { Figtree } from 'next/font/google'

// TODO: Internal dependencies
import SupabaseProvider from '~/providers/SupabaseProvider'
import UserProvider from '~/providers/UserProvider'
import ToasterProvider from '~/providers/ToasterProvider'
import ModalProvider from '~/providers/ModalProvider'
import Player from '~/components/Player'
import Sidebar from '~/components/Sidebar'
import getSongsByUserId from '~/actions/getSongsByUserId'

export const revalidate = 0
export const metadata = {
  title: 'Spotify Music App',
  description: 'Spotify Music App',
}

const font = Figtree({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs = await getSongsByUserId()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
