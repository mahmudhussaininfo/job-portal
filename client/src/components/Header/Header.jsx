import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { contextData } from "../../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { showRecrut, setShowRecrut } = useContext(contextData);

  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // Register user
        const response = await axios.post(
          "http://localhost:6060/api/register-user",
          formData
        );
        alert(response.data.message);
      } else {
        // Login user
        const response = await axios.post(
          "http://localhost:6060/api/login-user",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        alert(response.data.message);
        localStorage.setItem("token", response.data.token); // Store token
      }
      setShowLogin(false); // Hide the modal after success
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="shadow-md">
        <div className="container mx-auto flex justify-between items-center px-5">
          <div>
            <img
              onClick={() => navigate("/")}
              className="w-20 h-20 cursor-pointer"
              src={logo}
              alt="Logo"
            />
          </div>
          <div className="flex gap-5">
            <button onClick={() => setShowRecrut(true)} className="">
              Recruter Login
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-purple-500 text-white px-7 rounded-full py-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Login/Register Modal */}
      {showLogin && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-center text-xl font-bold">
              {isRegister ? "Register" : "Login"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {isRegister && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              {isRegister && <input type="file" />}

              <button
                type="submit"
                className="bg-purple-500 text-white p-2 rounded"
              >
                {isRegister ? "Register" : "Login"}
              </button>
            </form>
            <p className="text-center mt-3">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                onClick={toggleForm}
                className="text-blue-500 cursor-pointer"
              >
                {isRegister ? "Login" : "Register"}
              </span>
            </p>
            <button
              onClick={() => setShowLogin(false)}
              className="mt-3 text-red-500 block text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
