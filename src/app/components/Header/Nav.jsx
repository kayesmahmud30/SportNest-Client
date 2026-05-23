"use client";
import React from "react";
import {
  Search,
  Menu,
  Calendar,
  PlusSquare,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMoon, FiSun } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { CgProfile } from "react-icons/cg";

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const User = session?.user;

  const isLoggedIn = User;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="border-b border-theme bg-surface text-theme sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-6 h-16">
        <div className="navbar-start gap-2">
          <div className="dropdown sm:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white"
            >
              <Menu size={22} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-3 soft-shadow bg-surface border border-theme rounded-2xl w-64 gap-2"
            >
              <li>
                <Link
                  href="/"
                  className={
                    pathname === "/" ? "text-primary font-medium" : "muted-text"
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/all-facilities"
                  className={
                    pathname === "/all-facilities"
                      ? "text-primary font-medium"
                      : "muted-text"
                  }
                >
                  All Facilities
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <div className="divider my-1 border-theme"></div>
                  <li>
                    <Link
                      href="/my-bookings"
                      className={
                        pathname === "/my-bookings"
                          ? "text-primary font-medium"
                          : "muted-text"
                      }
                    >
                      <Calendar size={16} className="text-primary" /> My
                      Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/add-facilities"
                      className={
                        pathname === "/add-facilities"
                          ? "py-2 gap-2 text-primary"
                          : "py-2 gap-2 muted-text"
                      }
                    >
                      <PlusSquare size={16} className="text-theme" /> Add
                      Facility
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/manage-facilities"
                      className={
                        pathname === "/manage-facilities"
                          ? "text-primary font-medium"
                          : "muted-text"
                      }
                    >
                      <Settings size={16} className="text-theme" /> Manage My
                      Facilities
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-2 cursor-pointer select-none">
            <Image src={logo} width={40} height={40} alt="logo" />
            <p className="font-bold tracking-wider text-lg hidden md:block">
              Sport<span className="text-primary">Nest</span>
            </p>
          </div>
        </div>

        <div className="navbar-center hidden sm:flex">
          <ul className="menu menu-horizontal px-1 gap-1 font-medium">
            <li>
              <Link
                href="/"
                className={
                  pathname === "/"
                    ? "text-primary active:bg-transparent focus:bg-transparent relative after:content-[''] after:absolute after:-bottom-4.5 after:left-3 after:right-3 after:h-0.5 after:bg-primary"
                    : "muted-text hover:text-theme transition-colors"
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/all-facilities"
                className={
                  pathname === "/all-facilities"
                    ? "text-primary relative after:content-[''] after:absolute after:-bottom-4.5 after:left-3 after:right-3 after:h-0.5 after:bg-primary"
                    : "muted-text hover:text-theme transition-colors"
                }
              >
                All Facilities
              </Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <Link
                    href="/my-bookings"
                    className={
                      pathname === "/my-bookings"
                        ? "text-primary relative after:content-[''] after:absolute after:-bottom-4.5 after:left-3 after:right-3 after:h-0.5 after:bg-primary"
                        : "muted-text hover:text-theme transition-colors"
                    }
                  >
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/add-facilities"
                    className={
                      pathname === "/add-facilities"
                        ? "text-primary relative after:content-[''] after:absolute after:-bottom-4.5 after:left-3 after:right-3 after:h-0.5 after:bg-primary"
                        : "muted-text hover:text-theme transition-colors"
                    }
                  >
                    Add Facility
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manage-facilities"
                    className={
                      pathname === "/manage-facilities"
                        ? "text-primary relative after:content-[''] after:absolute after:-bottom-4.5 after:left-3 after:right-3 after:h-0.5 after:bg-primary"
                        : "muted-text hover:text-theme transition-colors"
                    }
                  >
                    Manage My Facilities
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="navbar-end gap-4">
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring-2 ring-green-300 focus:outline-none"
              >
                <div className="w-9 rounded-full">
                  <Image
                    width={400}
                    height={400}
                    alt={User.name}
                    src={
                      User?.image ||
                      "https://img.magnific.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?t=st=1779318066~exp=1779321666~hmac=9c9eeb560ce7b136ad3bbc2396dd7acc19a1b0dfb331240441d4599918b82361&w=1060"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 soft-shadow bg-surface border border-theme rounded-xl w-60 text-theme"
              >
                <li className="px-3 py-2 border-b border-theme pointer-events-none mb-1">
                  <p className="text-xs muted-text font-medium p-0">
                    Signed in as
                  </p>
                  <p className="text-sm text-primary font-semibold p-0 truncate">
                    {User.name}
                  </p>
                </li>
                <li>
                  <Link
                    href="/my-bookings"
                    className={
                      pathname === "/my-bookings"
                        ? "py-2 gap-2 text-primary"
                        : "py-2 gap-2 muted-text"
                    }
                  >
                    <Calendar size={16} className="text-theme" /> My Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/add-facilities"
                    className={
                      pathname === "/add-facilities"
                        ? "py-2 gap-2 text-primary"
                        : "py-2 gap-2 muted-text"
                    }
                  >
                    <PlusSquare size={16} className="text-theme" /> Add Facility
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manage-facilities"
                    className={
                      pathname === "/manage-facilities"
                        ? "py-2 gap-2 text-primary"
                        : "py-2 gap-2 muted-text"
                    }
                  >
                    <Settings size={16} className="text-theme" /> Manage My
                    Facilities
                  </Link>
                </li>
                <div className="divider my-1 border-theme"></div>
                <li>
                  <Button
                    onClick={handleLogout}
                    className="py-2 text-theme hover:text-primary hover:bg-transparent/10 gap-2"
                  >
                    <LogOut size={16} /> Log Out
                  </Button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login">
              <button className="btn btn-sm px-2 h-9 min-h-0 border-2 border-green-300 rounded-full btn-primary font-bold tracking-wide ">
                <p className="text-white flex justify-center items-center gap-1">
            <CgProfile className="text-[22px]"/>
                  Login</p>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
