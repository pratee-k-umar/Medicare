"use client";

import Image from "next/image";
import Link from "next/link";
import { getProviders, signIn, useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [providers, setProviders] = useState(null);
  const { data: session, status } = useSession();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const handleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  useEffect(() => {
    const fetchRole = async () => {
      const res = await fetch(`/api/user/${session?.user.id}/role`);
      const data = await res.json();
      setRole(data.role);
    };
    if (session?.user.id) fetchRole();
  }, [session]);
  const redirection = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };
  let destination = `/profile/${session?.user?.name}`;
  if (role === "admin") destination = `/admin`;
  useEffect(() => {
    if (status == "loading") setLoading(true);
    else setLoading(false);
  }, [status]);
  if (loading) {
    return <div className="py-5 mx-5"></div>;
  }
  return (
    <div className="flex justify-between align-center py-5 mx-5">
      <div className="logo">
        <Link href="/" className="text-2xl font-extrabold">
          Medicare
        </Link>
      </div>
      {session?.user && role !== "admin" ? (
        <div className="hidden sm:flex sm:gap-5 lg:gap-10 justify-center items-center navbar">
          <Link href="/" className={`nav_items hover:underline transition-all ${pathname==="/" ? "underline": ""}`}>
            Home
          </Link>
          {/* <Link
            href="/services"
            className="nav_items hover:underline transition-all"
          >
            Blogs
          </Link> */}
          <Link
            href="/find_doctor"
            className={`nav_items hover:underline transition-all ${pathname==="/find_doctor" ? "underline": ""}`}
          >
            Find a Doctor
          </Link>
          <Link
            href="/contact"
            className={`nav_items hover:underline transition-all ${pathname==="/contact" ? "underline": ""}`}
          >
            Contact us
          </Link>
        </div>
      ) : (
        <></>
      )}
      {session?.user ? (
        <div className="profile_image rounded-full">
          {pathname === "/admin" ? (
            <button
              type="button"
              className="font-bold text-blue-500 border border-blue-500 transition-all hover:bg-blue-500 hover:text-white py-1 px-4 rounded-full shadow-xl flex mx-auto"
              onClick={redirection}
            >
              Sign Out
            </button>
          ) : (
            <>
              <div className="hidden sm:block">
                {session?.user.image ? (
                  <Link href={destination}>
                    <Image
                      src={session?.user.image}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="profile"
                    />
                  </Link>
                ) : (
                  <AccountCircleIcon
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                )}
              </div>
              <div className="sm:hidden">
                <FontAwesomeIcon
                  className="text-4xl"
                  icon={faBars}
                  onClick={handleShow}
                />
              </div>
              <div
                className={`${
                  show ? "block" : "hidden"
                } absolute border flex flex-col gap-4 w-full left-0 top-0 h-full items-center pt-5`}
              >
                <div className="flex justify-between items-center w-full mb-10 px-4">
                  <Link href="/" className="text-2xl font-extrabold">
                    Medicare
                  </Link>
                  {session?.user.image ? (
                    <Link href={destination}>
                      <Image
                        src={session?.user.image}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="profile"
                      />
                    </Link>
                  ) : (
                    <AccountCircleIcon
                      className="rounded-full"
                      width={40}
                      height={40}
                    />
                  )}
                </div>
                <Link
                  href="/"
                  className="nav_items hover:underline transition-all"
                >
                  Home
                </Link>
                <Link
                  href="/find_doctor"
                  className="nav_items hover:underline transition-all"
                >
                  Find a Doctor
                </Link>
                <Link
                  href="/contact"
                  className="nav_items hover:underline transition-all"
                >
                  Contact us
                </Link>
                <div className="border p-3 rounded-full flex items-center px-4 shadow-xl absolute bottom-10" onClick={handleShow}>
                  <FontAwesomeIcon className="text-2xl" icon={faXmark} />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <div className="register">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="font-bold text-blue-500 border border-blue-500 transition-all hover:bg-blue-500 hover:text-white py-1 px-4 rounded-full shadow-xl flex mx-auto"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
