"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/data/users";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  // Run only on the client
  useEffect(() => {
    setHydrated(true);

    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }

  // Prevent server/client mismatch
  if (!hydrated) {
    return (
      <nav className="w-full px-6 py-4 border-b bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Handcrafted Haven</h1>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full px-6 py-4 border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Handcrafted Haven
        </h1>

        <ul className="hidden md:flex gap-6 text-gray-700">

          {/* Always visible */}
          <li onClick={() => router.push("/")} className="cursor-pointer hover:text-black">
            Home
          </li>
          <li onClick={() => router.push("/products")} className="cursor-pointer hover:text-black">
            Catalog
          </li>
          <li onClick={() => router.push("/sellers")} className="cursor-pointer hover:text-black">
            Sellers
          </li>

          {/* Not logged in */}
          {!user && (
            <li
              onClick={() => router.push("/login")}
              className="cursor-pointer hover:text-black"
            >
              Login
            </li>
          )}

          {/* Logged in seller */}
          {user?.role === "seller" && (
            <>
              <li
                onClick={() => router.push(`/sellers/${user.sellerId}`)}
                className="cursor-pointer text-amber-700 font-medium hover:text-black"
              >
                My Store
              </li>

              <li
                onClick={() => router.push("/products/new")}
                className="cursor-pointer text-green-700 font-medium hover:text-green-900"
              >
                Add Product
              </li>
            </>
          )}

          {/* Logged in user */}
          {user && (
            <li
              onClick={handleLogout}
              className="cursor-pointer hover:text-red-600"
            >
              Logout
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
