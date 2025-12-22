"use client";
import { createBrowserClient } from "@supabase/ssr";
export default function LoginGoogle() {
  //init supabase client for the navigator
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async () => {
    try{
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    }catch(ex : any){
      console.log(ex)
    }

  };

  return (
    <button onClick={handleLogin} className="btn btn-outline-danger shadow-sm">
      <i className="bi bi-google me-2"></i> Register with Google
    </button>
  );
}
