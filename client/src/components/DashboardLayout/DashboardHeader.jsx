import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "./../../../public/assets";
import { contextData } from "../../context/AppContext";
import axios from "axios";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { companyData, setIsAuthenticated, setCompanyData, BaseUrl } =
    useContext(contextData);

  const handlelogout = async () => {
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
      axios.error(error.message);
    }
  };
  return (
    <>
      {" "}
      <div className="shadow-md">
        <div className="container mx-auto flex justify-between items-center px-5">
          {/* logo */}
          <div>
            <img
              onClick={() => navigate("/")}
              className="w-20 h-20 cursor-pointer"
              src={assets.logo}
              alt=""
            />
          </div>
          {/* right side */}
          {companyData && companyData ? (
            <div className="flex items-center gap-3">
              <p>{companyData?.name}</p>
              <div className="relative group cursor-pointer">
                <img className="h-8" src={companyData?.photo} alt="" />
                <div className="absolute hidden group-hover:block right-0 top-0 z-10 text-black rounded p-14">
                  <ul className="bg-white list-none m-0 p-2 border border-gray-300">
                    <li>My Profile</li>
                    <li onClick={() => handlelogout()} className="pr-10">
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <p>Welcome</p>
              <div className="relative group cursor-pointer">
                <img className="h-8" src={assets.avatar} alt="" />
                <div className="absolute hidden group-hover:block right-0 top-0 z-10 text-black rounded p-14">
                  <ul className="bg-white list-none m-0 p-2 border border-gray-300">
                    <li>My Profile</li>
                    <li className="pr-10">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
