import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "./../../../public/assets";
import { contextData } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure toast is imported

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { companyData, setIsAuthenticated, setCompanyData, BaseUrl } =
    useContext(contextData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Logout function
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/company-delete`);
      if (data) {
        setIsAuthenticated(false);
        setCompanyData(null);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="shadow-md">
      <div className="container mx-auto flex justify-between items-center px-5">
        {/* Logo */}
        <div>
          <img
            onClick={() => navigate("/")}
            className="w-20 h-20 cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
        </div>

        {/* Right Side - User Info */}
        {companyData ? (
          <div className="flex items-center gap-3">
            <p>{companyData?.name}</p>
            <div ref={dropdownRef} className="relative cursor-pointer">
              <img
                className="h-8"
                src={companyData?.photo}
                alt="Profile"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 z-10 bg-white border border-gray-300 rounded shadow-md w-40">
                  <ul className="list-none p-2">
                    <li
                      onClick={handleLogout}
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <p>Welcome</p>
            <div ref={dropdownRef} className="relative cursor-pointer">
              <img
                className="h-8"
                src={assets.avatar}
                alt="Default Profile"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-10 z-10 bg-white border border-gray-300 rounded shadow-md w-40">
                  <ul className="list-none p-2">
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                      My Profile
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
