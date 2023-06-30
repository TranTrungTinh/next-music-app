'use client'

// TODO: Import external dependencies
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider  } from "@supabase/auth-helpers-react"
import { useState } from "react";

// TODO: Import internal dependencies from local files.
import { Database } from "~/types/types_db";

// TODO: Props interface
interface SupabaseProviderProps {
  children?: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children,
}) => {

  // TODO: Create State
  const [supabaseClient] = useState(
    () => createPagesBrowserClient<Database>()
  );

  // TODO: UI
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>  
  );
}
 
export default SupabaseProvider;