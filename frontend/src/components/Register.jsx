
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = ({ setIsLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, phone, password })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
toast.success("Registration Successfull!")

        navigate("/");
      }
      else{
        toast.error("User already exists!")
      }
    });
  };

  return (
    <>
    <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <div className="flex items-center justify-center min-h-screen bg-[#ebecff] text-black overflow-hidden">
    
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg" />
          <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded-lg" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          <button 
            onClick={() => setIsLogin(true)} 
            className="text-blue-500"
          >
            Already have an account? Login
          </button>
        </p>
      </div>
    </div>
    </>
  );
};

export default Register;
