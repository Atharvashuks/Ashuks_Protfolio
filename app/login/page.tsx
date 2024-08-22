// pages/login.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   const fetchAdminData = async () => {
  //     const token = localStorage.getItem("token");

  //     if (token) {
  //       router.push("/admin");
  //       return;
  //     }
  //   };

  //   fetchAdminData();
  // }, [router]);

  const handleLogin = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.status == 200) {
      localStorage.setItem("token", data.token);
      router.push("/admin");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg border-2 border-sky-700">
        <h2 className="text-2xl font-bold text-center text-sky-800 mb-6">
          Admin Access
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-sky-800 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 text-sky-800 border rounded-lg focus:outline-none focus:border-sky-600"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sky-800 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-sky-800 border rounded-lg focus:outline-none focus:border-sky-600"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
