import React from "react";
import { FiHome, FiUser, FiPlus } from "react-icons/fi";

const UserSidebar = ({ setComponent }) => {
  return (
    <div className="hidden md:flex bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <ul className="space-y-4">
          <li className="flex items-center">
            <FiHome className="mr-2" />
            <button onClick={() => setComponent("Dashboard")}>Dashboard</button>
          </li>
          <li className="flex items-center">
            <FiUser className="mr-2" />
            <button onClick={() => setComponent("Bookings")}>Bookings</button>
          </li>
          <li className="flex items-center">
            <FiPlus className="mr-2" />
            <button onClick={() => setComponent("Listings")}>
              My Listings
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
