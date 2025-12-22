"use client";

import { Nav, Navbar } from "react-bootstrap";
import { useLogin } from "@/hooks/auth/useLogin";

export const NavBar = () => {
  const { loginWithGoogle, isLoading } = useLogin();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
      <Nav className="w-100 px-4 d-flex justify-content-end  justify-content-md-center flex-row gap-3 gap-md-5">
        <Nav.Link href="/">Home</Nav.Link>

        <Nav.Link onClick={loginWithGoogle} disabled={isLoading}>
          {isLoading ? "Cargando..." : "Login"}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
