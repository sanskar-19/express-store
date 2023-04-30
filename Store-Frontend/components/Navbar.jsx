import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogin, MdLogout, MdMenu } from "react-icons/md";
const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      setAuthenticated(true);
    }
  }, [router?.asPath]);
  return (
    <nav className="w-full px-2 bg-accentColor h-20 sticky top-0 left-0 z-20 flex items-center select-none">
      <main className="max-w-7xl mx-auto flex justify-between w-full h-full sm:items-center">
        {/* Logo */}
        <div className="relative text-white text-xl h-full flex items-center">
          <span className="italic font-bold">Express</span> Shop
        </div>

        <input
          type="checkbox"
          className="invisible peer sm:hidden"
          id="menu-open"
          defaultChecked
        />
        <label htmlFor="menu-open" className="sm:hidden">
          <div className="absolute right-4 top-1/2 translate-y-[-50%] p-2 bg-white text-2xl text-accentColor rounded-md z-20 sm:hidden">
            <MdMenu />
          </div>
        </label>
        {/* Nav Menu */}
        <div className="peer-checked:hidden sm:peer-checked:flex absolute top-full items-start left-0 w-full p-4 sm:p-0 sm:top-0 sm:justify-end sm:relative flex flex-col gap-y-4 bg-accentColor sm:flex-row gap-x-4 text-white font-normal sm:items-center">
          {!authenticated && <Link href={"/"}>Register </Link>}
          {authenticated && (
            <>
              <Link href={"/users"}>Users</Link>
              <Link href={"/shop"}>Products </Link>
              <Link href={"/shop/categories"}>Categories</Link>
              <Link
                href={"/shop/cart"}
                className="p-2 bg-white text-2xl text-accentColor rounded-md"
              >
                <FaShoppingCart />
              </Link>
            </>
          )}
          <a
            href={"/login"}
            onClick={() => {
              localStorage.removeItem("auth-token");
            }}
          >
            {authenticated ? (
              <p className="p-2 bg-white text-2xl text-accentColor rounded-md">
                <MdLogout />
              </p>
            ) : (
              <p className="p-2 bg-white text-2xl text-accentColor rounded-md">
                <MdLogin />
              </p>
            )}
          </a>
        </div>
      </main>
    </nav>
  );
};

export default Navbar;
