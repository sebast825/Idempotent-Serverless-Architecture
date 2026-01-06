import { assignPlayerToGame } from "@/lib/game/service";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";
  const origin = process.env.PRODUCTION_URL || requestUrl.origin;

  const finalUrl = new URL(next, origin);
  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {}
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      //if a player is not login and play a game when he finish can login and add his id to the game
      const claimGameId = finalUrl.searchParams.get("claimGameId");
      if (claimGameId) {
        await assignPlayerToGame(claimGameId, data.user.id);
        finalUrl.searchParams.delete("claimGameId");
      }
      finalUrl.searchParams.delete("code");

      const response = NextResponse.redirect(finalUrl);
      response.headers.set("Cache-Control", "no-store, max-age=0");
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
