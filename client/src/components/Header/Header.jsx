import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { contextData } from "../../context/AppContext";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { showRecrut, setShowRecrut, user, setUser, BaseUrl } =
    useContext(contextData);

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

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/logout-user`, {
        withCredentials: true,
      });
      if (data) {
        toast.success(data.message);
        setUser(null); // Set user to null
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isRegister) {
        // Register user
        response = await axios.post(`${BaseUrl}/api/register-user`, formData);
      } else {
        // Login user
        response = await axios.post(
          `${BaseUrl}/api/login-user`,
          {
            email: formData.email,
            password: formData.password,
          },
          {
            withCredentials: true,
          }
        );
      }

      if (response.data) {
        toast.success(response.data.message);
        setUser(response.data.user); // Update the user state
        setShowLogin(false); // Close the modal
        navigate("/"); // Redirect if needed
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
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

          <div className="flex-1 text-end">
            <button onClick={() => navigate("/application")}>
              Applied Jobs
            </button>
            <span className="ml-2 mr-2">|</span>
          </div>

          {/* Show user info if logged in, else show login buttons */}
          {user ? (
            <div className="flex items-center gap-5">
              <p>{user?.name}</p>
              <div>
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.photo}
                  alt=""
                />
              </div>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-5">
              <button onClick={() => setShowRecrut(true)}>
                Recruter Login
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-purple-500 text-white px-7 rounded-full py-2"
              >
                Login
              </button>
            </div>
          )}
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
