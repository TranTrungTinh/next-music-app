'use client'

// TODO: Import external dependencies
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// TODO: Import internal dependencies from local files.
import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";


const AuthModal = () => {
  const router = useRouter()
  const { session } = useSessionContext()
  const { isOpen, onClose } = useAuthModal()
  const supabaseClient = useSupabaseClient()

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [session, router, onClose])

  const onSignIn = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Modal
      title="Welcome back"
      description="Sign in to continue"
      isOpen={isOpen}
      onChange={onSignIn}
    >
      <Auth 
        supabaseClient={supabaseClient}
        providers={['google']}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
      />
    </Modal>
  );
}
 
export default AuthModal;