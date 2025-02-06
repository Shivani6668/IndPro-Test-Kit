import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Main() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#ebecff] text-black flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Task Management App</h1>
        <div>
          <button 
            onClick={() => setIsLogin(true)} 
            className={`px-4 py-2 rounded-lg mr-4 ${isLogin ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)} 
            className={`px-4 py-2 rounded-lg ${!isLogin ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'}`}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Conditional Rendering */}
      {isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}
    </div>
  );
}

export default Main;
