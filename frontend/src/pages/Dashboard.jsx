import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaList, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Update sidebar state based on window width
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);  // Sidebar should be closed on mobile by default
    }
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');  
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-blue-900 text-white py-4 px-6 flex items-center w-full sticky top-0 z-20">
        <button
          className="text-white text-2xl mr-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          &#9776;
        </button>
        <h1 className="text-2xl font-bold">Task Management App</h1>
      </nav>

      <div className="flex flex-1">
        <div
          className={`bg-blue-900 shadow-lg p-4 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed h-full z-10 w-full md:w-64`}
        >
          <ul className="space-y-6 text-white">
            <Link to="/dashboard" onClick={handleLinkClick}>
              <li className={`flex items-center space-x-3 cursor-pointer hover:text-blue-300 p-2 rounded-md`}>
                <FaTachometerAlt className="text-lg" />
                <span>Dashboard</span>
              </li>
            </Link>

            <Link to="/list" onClick={handleLinkClick}>
              <li className={`flex items-center space-x-3 cursor-pointer hover:text-blue-300 p-2 rounded-md`}>
                <FaList className="text-lg" />
                <span>Task List</span>
              </li>
            </Link>

            <Link to="/" onClick={handleLogout}>
              <li className={`flex items-center space-x-3 cursor-pointer hover:text-blue-300 p-2 rounded-md`}>
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </li>
            </Link>
          </ul>
        </div>
        <div
          className={`flex-1 transition-all ${isSidebarOpen ? "ml-64" : "ml-0"} overflow-y-auto`}
          style={{ maxHeight: "calc(100vh - 64px)" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
