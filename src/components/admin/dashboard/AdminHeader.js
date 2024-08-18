// src/components/admin/dashboard/AdminHeader.js
import { useState } from "react";
import { useRouter } from "next/router";
import { FiHome, FiUser, FiPlus } from "react-icons/fi";

const AdminHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const router = useRouter();

  const handleNavigation = (component) => {
    router.push(`/admin/dashboard?component=${component}`, undefined, {
      shallow: true,
    });
    setIsNavOpen(false); // Close the menu after navigating
  };

  return (
    <header className="bg-green-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl">Admin Dashboard</h1>
      <button
        className="text-white md:hidden"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        ☰
      </button>
      <nav
        className={`${
          isNavOpen ? "block" : "hidden"
        } md:flex space-x-4 absolute md:relative top-14 left-0 w-full bg-green-600 md:bg-transparent md:top-0`}
      >
        <div className="md:hidden p-4">
          <ul className="space-y-4">
            <li className="flex items-center">
              <FiHome className="mr-2" />
              <button onClick={() => handleNavigation("Dashboard")}>
                Dashboard
              </button>
            </li>

            <li className="flex items-center">
              <FiUser className="mr-2" />
              <button onClick={() => handleNavigation("Users")}>Users</button>
            </li>
            <li className="flex items-center">
              <FiUser className="mr-2" />
              <button onClick={() => handleNavigation("ManageBookings")}>
                Manage Bookings
              </button>
            </li>

            <li className="flex items-center">
              <FiUser className="mr-2" />
              <button onClick={() => handleNavigation("ManageCars")}>
                Manage Cars
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
