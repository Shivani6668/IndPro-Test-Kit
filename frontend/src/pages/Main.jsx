import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Main() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#ebecff] text-black flex flex-col">
      <nav className="bg-blue-900 text-white py-4 px-4 md:px-8 flex justify-between items-center shadow-md">
        <h1 className="text-lg md:text-2xl font-bold">Task Management App</h1>
        <div className="flex space-x-2 md:space-x-4">
          <button 
            onClick={() => setIsLogin(true)} 
            className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base ${isLogin ? 'bg-white text-black' : 'bg-blue-700 text-white'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)} 
            className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base ${!isLogin ? 'bg-white text-black' : 'bg-blue-700 text-white'}`}
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center flex-1 p-4 md:p-8 lg:p-12">
        {isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
}

export default Main;
