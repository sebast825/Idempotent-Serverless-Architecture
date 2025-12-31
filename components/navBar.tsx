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
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

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
        <Nav
          className="w-100 px-4 d-flex  m-auto justify-content-between flex-row gap-3 gap-md-5  px-md-5"
          style={{ maxWidth: "1500px" }}
        >
          <div>
            <Link href={user ? ROUTES.dashboard() : ROUTES.home()}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2ac4dfff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="7 4 21 12 7 20 7 4"></polygon>
              </svg>
            </Link>
          </div>
          <div className="d-flex align-items-center">
            {!user ? (
              <NavDropdown.Item
                className="text-light"
                onClick={loginWithGoogle}
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Login"}
              </NavDropdown.Item>
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
                <NavDropdown.Item
                  onClick={() => handleOpenNotifications()}
                  className="dropdown-item py-1 px-3  text-dark"
                >
                  Notifications
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => openModal("HISTORYGAMES")}
                  className="dropdown-item py-1 px-3  text-dark"
                >
                  My History
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => openModal("USERSTATS")}
                  className="dropdown-item py-1 px-3  text-dark"
                >
                  Performance
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Link}
                  href={ROUTES.home()}
                  className="dropdown-item py-1 px-3"
                >
                  Home
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={Link}
                  href={ROUTES.dashboard()}
                  className="dropdown-item py-1 px-3"
                >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => openModal("GAME_RULES")}
                  className="dropdown-item py-1 px-3  text-dark"
                >
                  How to Play
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => signOut()}
                  disabled={isLoading}
                  className="dropdown-item py-1 px-3 text-danger"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Nav>
      </Navbar>
    </>
  );
};
