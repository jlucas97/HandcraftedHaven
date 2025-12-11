"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/data/users";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Look for matching user
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    // Save user session
   localStorage.setItem("user", JSON.stringify(user));

router.refresh();
router.push("/");

  }

  return (
    <main className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded-lg w-full max-w-md bg-white shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <label className="block mb-1 text-gray-700">Email</label>
        <input
          className="border p-2 rounded w-full mb-4"
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-1 text-gray-700">Password</label>
        <input
          className="border p-2 rounded w-full mb-6"
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </main>
  );
}
