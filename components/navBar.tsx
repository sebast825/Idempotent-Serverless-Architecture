"use client";

import { Badge, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLogin } from "@/hooks/auth/useLogin";
import { signOut } from "@/app/auth/actions";
import { User } from "@supabase/supabase-js"; 
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotificationActions } from "@/app/actions/notificationActions";
import { NotificationsModal } from "./modals/notificationsModal";

export const NavBar = ({ user }: { user: User | null }) => {
    const [showModal, setShowModal] = useState<boolean>(false);

  const { loginWithGoogle, isLoading } = useLogin();
  useEffect(() => {
    console.log(user);
  }, [user]);

  const { data: notifications } = useQuery({
    queryKey: ["notifications", user],
    queryFn: () => getNotificationActions(),
  });

  return (
    <>
    {showModal && notifications && <NotificationsModal showModal={showModal} setShowModal={()=>setShowModal(!showModal) } notifications={notifications}></NotificationsModal>}
    <Navbar bg="dark" variant="dark"  fixed="top" className="shadow">
      <Nav className="w-100 px-4 d-flex justify-content-end justify-content-md-center flex-row gap-3 gap-md-5 align-items-center">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>

        {!user ? (
          <Nav.Link onClick={loginWithGoogle} disabled={isLoading}>
            {isLoading ? "Cargando..." : "Login"}
          </Nav.Link>
        ) : (
          <NavDropdown
            title={
              <span className="d-inline-flex align-items-center">
                {user.user_metadata?.full_name || "Mi Cuenta"}
                {notifications && notifications?.length > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="ms-2"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {notifications?.length}
                  </Badge>
                )}
              </span>
            }
            id="user-nav-dropdown"
            align="end"
          >
            <Nav.Link
              onClick={() => setShowModal(true)}
              className="dropdown-item py-1 px-3  text-dark"
            >
              Notifications
            </Nav.Link>
            
            <Nav.Link
              onClick={() => signOut()}
              disabled={isLoading}
              className="dropdown-item py-1 px-3 text-danger"
            >
              Logout
            </Nav.Link>
          </NavDropdown>
        )}
      </Nav>
    </Navbar>
    </>
  );
};
