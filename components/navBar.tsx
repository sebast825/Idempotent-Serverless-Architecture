"use client";

import { Badge, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLogin } from "@/hooks/auth/useLogin";
import { signOut } from "@/app/auth/actions";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import {
  useNotifications,
  useSetNoticationReadAt,
} from "@/hooks/useNotifications";

export const NavBar = ({ user }: { user: User | null }) => {
  const openModal = useModalStore((state) => state.openModal);
  const { loginWithGoogle, isLoading } = useLogin();
  useEffect(() => {
    console.log(user);
  }, [user]);
  const { data: notifications } = useNotifications(user != null);
  const { mutate: markNotificationsAsRead } = useSetNoticationReadAt();

  const handleOpenNotifications = () => {
    openModal("NOTIFICATIONS");
    notifications && markNotificationsAsRead(notifications?.map((n) => n.id));
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" className="shadow">
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
                  {notifications &&
                    notifications?.some((elem) => elem.readAt == null) && (
                      <Badge
                        pill
                        bg="danger"
                        className="ms-2"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {
                          notifications?.filter((elem) => elem.readAt == null)
                            .length
                        }
                      </Badge>
                    )}
                </span>
              }
              id="user-nav-dropdown"
              align="end"
            >
              <Nav.Link
                onClick={() => handleOpenNotifications()}
                className="dropdown-item py-1 px-3  text-dark"
              >
                Notifications
              </Nav.Link>
              <Nav.Link
                onClick={() => openModal("HISTORYGAMES")}
                className="dropdown-item py-1 px-3  text-dark"
              >
                My History
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
