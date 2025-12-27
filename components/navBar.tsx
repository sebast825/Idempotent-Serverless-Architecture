"use client";

import { Nav, Navbar } from "react-bootstrap";
import { useLogin } from "@/hooks/auth/useLogin";
import { signOut } from "@/app/auth/actions";
import { User } from "@supabase/supabase-js"; // Importa el tipo oficial
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotificationActions } from "@/app/actions/notificationActions";

export const NavBar = ({ user }: { user: User | null }) => {
  const { loginWithGoogle, isLoading } = useLogin();
  useEffect(() => {
    console.log(user);
  }, [user]);

    const { data } = useQuery({
    queryKey: ['notifications', user],
    queryFn:  () => getNotificationActions()
    
  });

  useEffect(() => {
    if (data) {
      console.log("Notificaciones:", data);
    }}, [data]);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
      <Nav className="w-100 px-4 d-flex justify-content-end  justify-content-md-center flex-row gap-3 gap-md-5">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>

        {!user ? (
          <Nav.Link onClick={loginWithGoogle} disabled={isLoading}>
            {isLoading ? "Cargando..." : "Login"}
          </Nav.Link>
        ) : (
          <Nav.Link as="div">
            <form action={signOut}>
              <button
                type="submit"
                className="nav-link border-0 bg-transparent p-0 m-0"
              >
                Logout
              </button>
            </form>
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};
