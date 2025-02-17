import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { contextData } from "../../context/AppContext";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const navigate = useNavigate();
  const { setShowRecrut, user, setUser, BaseUrl, isAuthenticated, fetchUser } =
    useContext(contextData);

  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/logout-user`, {
        withCredentials: true,
      });
      if (data) {
        toast.success(data.message);
        fetchUser();
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
      if (isRegister) {
        // Register user
        const { data } = await axios.post(
          `${BaseUrl}/api/register-user`,
          formData
        );
        if (data) {
          toast.success(data.message);
          setUser(data.user);
          fetchUser();
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        // Login user
        const { data } = await axios.post(
          `${BaseUrl}/api/login-user`,
          {
            email: formData.email,
            password: formData.password,
          },
          {
            withCredentials: true,
          }
        );
        if (data) {
          toast.success(data.message);
          fetchUser();
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
            {isAuthenticated ? (
              <>
                {" "}
                <span className="mr-3 max-sm:hidden">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </span>
                <span className="max-sm:hidden"> | </span>
              </>
            ) : null}

            <button
              className="bg-purple-500 text-white md:px-5 md:py-2 py-2 px-6 text-sm rounded-full ml-2 max-sm:mr-5"
              onClick={() => navigate("/application")}
            >
              Applied Jobs
            </button>
          </div>
          <div>
            <button
              className="bg-purple-500 max-sm:hidden text-white text-sm px-5 py-2 rounded-full mr-4 ml-2"
              onClick={() => setShowRecrut(true)}
            >
              Recruter Login
            </button>
          </div>

          {/* Show user info if logged in, else show login buttons */}
          {user ? (
            <div className="flex items-center gap-5">
              <div ref={dropdownRef} className="relative cursor-pointer">
                <img
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="h-10 w-10 rounded-full"
                  src={user?.photo}
                  alt=""
                />
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 z-20 bg-white border border-gray-300 rounded shadow-md w-40">
                    <ul className="list-none p-2">
                      <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                        <button onClick={handleLogout} className="text-red-500">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <p className="text-sm">{user?.name}</p>
            </div>
          ) : (
            <div className="flex gap-5">
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
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setShowLogin(false)}
              className="right-3 top-3 absolute"
            >
              <RxCross2 />
            </button>
            <h2 className="text-center text-xl font-bold py-3 mb-5">
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
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
