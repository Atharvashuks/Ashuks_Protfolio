import React from "react";
import { logout } from "../apiEndpoint";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  return (
    <div className="bg-sky-700 text-white p-4 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Admin Panel</h1>
        <div className="flex items-center">
          <span className="mr-4 text-sm md:text-base">Hello, Admin</span>
          <button
            className="bg-sky-800 px-4 py-2 rounded-lg hover:bg-sky-900 text-sm md:text-base"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
