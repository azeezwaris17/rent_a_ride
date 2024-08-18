// src/components/admin/dashboard/AdminSidebar.js
import React from "react";
import { useRouter } from "next/router";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

const AdminSidebar = () => {
  const router = useRouter();

  const handleNavigation = (component) => {
    router.push(`/admin/dashboard?component=${component}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="hidden md:flex bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <ul className="space-y-4">
          <li className="flex items-center">
            <FiHome className="mr-2" />
            <button onClick={() => handleNavigation("Dashboard")}>
              Dashboard
            </button>
          </li>
          <li className="flex items-center">
            <FiUser className="mr-2" />
            <button onClick={() => handleNavigation("ManageUsers")}>
              Manage Users
            </button>
          </li>
          <li className="flex items-center">
            <FiSettings className="mr-2" />
            <button onClick={() => handleNavigation("ManageCars")}>
              Manage Cars
            </button>
          </li>
          <li className="flex items-center">
            <FiSettings className="mr-2" />
            <button onClick={() => handleNavigation("ManageBookings")}>
              Manage Bookings
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
