
// TODO: Import external dependencies
import { createContext, useContext, useEffect, useState } from 'react'
import {
  useUser as useSupaUser,
  useSessionContext,
  User
} from '@supabase/auth-helpers-react'


// TODO: Import internal dependencies from local files.
import { UserDetails, Subscription } from '@/types'

// TODO: Props & Type
type UserContentType = {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
  subscription: Subscription | null
}
export interface Props extends Record<string, any> {}


// TODO: Create State
export const UserContext = createContext<UserContentType | undefined>(undefined)

export const MyUserContextProvider = (props: Props) => {

  // TODO: Create State
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext()

  const [isLoadingData, setLoadingData] = useState(false)
  const [userDetails, seUserDetails] = useState<UserDetails | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  const user = useSupaUser()
  const accessToken = session?.access_token ?? null

  // TODO: Create Functions
  const getUserDetails = () => supabase.from('users').select('*').single()
  const getSubscription = () => 
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single()

  // TODO: watch for changes
  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setLoadingData(true)
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        ([userDetailsPromise, subscriptionPromise]) => {
          if (userDetailsPromise.status === 'fulfilled') {
            seUserDetails(userDetailsPromise.value.data as UserDetails)
          }

          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(subscriptionPromise.value.data as Subscription)
          }

          setLoadingData(false)
        }
      )
    } else if (!user && !isLoadingUser && !isLoadingData) {
      seUserDetails(null)
      setSubscription(null)
    }
  }, [user, isLoadingUser])

  const dataValue = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  }

  return <UserContext.Provider value={dataValue} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}