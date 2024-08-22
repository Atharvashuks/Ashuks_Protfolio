// /pages/protected-page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { Loader } from "../../components";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch("/api/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
        } else {
          setError("Access denied or invalid token");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      } catch (error) {
        setError("An error occurred");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="content-center flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <>
      <div>Admin Protected Content</div>
    </>
  );
}
