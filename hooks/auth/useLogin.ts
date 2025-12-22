// hooks/auth/use-login.ts
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (ex: any) {
      console.error(ex);
    } finally {
      setIsLoading(false);
    }
  };

  // El hook devuelve la función y el estado
  return { loginWithGoogle, isLoading };
};