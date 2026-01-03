import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { NavBar } from "@/components/navBar";
import { createClient } from "@/lib/supabase/server";
import QueryProvider from "./providers/query-provider";
import { ToastContainer, Flip } from "react-toastify";
import { ModalManager } from "@/components/modals/modalManager";
import { Michroma, Chakra_Petch} from "next/font/google";

export const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
});
export const chakra = Chakra_Petch({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
});



export const metadata: Metadata = {
  title: "Mastermind Game | Decode the Secret",
  description:
    "Challenge your mind with the Mastermind logic game. Guess the secret color code.",
  keywords: ["Mastermind", "Puzzle", "Logic Game", "React Game"],
  authors: [{ name: "Tu Nombre o Marca" }],
  openGraph: {
    title: "Mastermind Game",
    description: "Crack the secret code!",
    type: "website",
  },
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await createClient();

  return (
    <html lang="en">
      <body className={`${chakra.variable} ${michroma.variable}`}>
        <QueryProvider>
          <NavBar user={user}></NavBar>
          {children}
          <ModalManager />
        </QueryProvider>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss={true}
          theme="colored"
          transition={Flip}
        />
      </body>
    </html>
  );
}
