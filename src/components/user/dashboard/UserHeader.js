// src/components/user/dashboard/user/UserHeader.js
import { useState } from "react";
import { FiHome, FiUser, FiPlus } from "react-icons/fi";

const UserHeader = ({ setComponent }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavigation = (component) => {
    console.log(`Menu Item Clicked: ${component}`); // Logging the clicked menu item
    console.log(`Rendering Component: ${component}`); // Logging the component being rendered
    setComponent(component); // Use setComponent to switch the component
    setIsNavOpen(false); // Close the menu after navigating
  };

  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center relative">
      <h1 className="text-white text-2xl">User Dashboard</h1>

      <div className="block md:hidden">
        <button className="text-white" onClick={() => setIsNavOpen(!isNavOpen)}>
          ☰
        </button>
        <nav
          className={`${
            isNavOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-blue-600 md:relative md:w-auto md:bg-transparent md:top-0`}
        >
          <ul className="p-4 space-y-4 md:space-y-0">
            <li className="flex items-center">
              <FiHome className="mr-2" />
              <button
                className="text-white"
                onClick={() => handleNavigation("Dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li className="flex items-center">
              <FiUser className="mr-2" />
              <button
                className="text-white"
                onClick={() => handleNavigation("Bookings")}
              >
                Bookings
              </button>
            </li>
            <li className="flex items-center">
              <FiPlus className="mr-2" />
              <button
                className="text-white"
                onClick={() => handleNavigation("Listings")}
              >
                My Listings
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;
