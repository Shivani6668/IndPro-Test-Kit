import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"; // Outlet renders nested routes
import { FaTachometerAlt, FaList, FaSignOutAlt } from 'react-icons/fa'; // Importing icons from React Icons

const Dashboard = () => {
const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open sidebar

  // Function to handle navigation and close sidebar
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false); // Close sidebar on small screens when a link is clicked
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white py-4 px-6 flex items-center w-full sticky top-0 z-20">
        <button
          className="text-white text-2xl mr-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          &#9776; {/* Three-line menu icon */}
        </button>
        <h1 className="text-2xl font-bold">Task Management App</h1>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        {/* <div
          className={`bg-blue-700 shadow-lg p-4 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed h-full z-10 w-full md:w-64`} // Use w-full on small screens and w-64 on large
        > */}
         
         <div
      className={`bg-blue-900 shadow-lg p-4 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed h-full z-10 w-full md:w-64`}
    >
          <ul className="space-y-6 text-white">
            <Link to="/dashboard" onClick={handleLinkClick}>
              <li   className={`flex items-center space-x-3 cursor-pointer hover:text-blue-300 p-2 rounded-md`}
    >
       <FaTachometerAlt className="text-lg" />
       <span>Dashboard</span>
                </li>
            </Link>

            <Link to="/list" onClick={handleLinkClick}>
              <li   className={`flex items-center space-x-3 cursor-pointer hover:text-blue-300 p-2 rounded-md`}
    >
      <FaList className="text-lg" />
      <span>Task List</span>
    </li>
            </Link>

            <Link to="/" onClick={handleLinkClick}>
              <li   className={`flex items-center space-x-3 cursor-pointer hover:text-blue-300 p-2 rounded-md`}
    >
      
      <FaSignOutAlt className="text-lg" />
      <span>Logout</span>
    </li>
            </Link>

            {/* Add other navigation items as needed */}
          </ul>
        </div>

        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all ${isSidebarOpen ? "ml-64" : "ml-0"} overflow-y-auto`}
          style={{ maxHeight: "calc(100vh - 64px)" }} // Account for navbar height
        >
          {/* Render nested routes like the Welcome message or TaskList inside Dashboard layout */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





















