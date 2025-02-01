import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { RiHome3Line } from "react-icons/ri";
import { MdAddToQueue } from "react-icons/md";
import { FaStreetView } from "react-icons/fa";

const DashboardData = () => {
  return (
    <>
      <div className="min-h-screen">
        <div className="flex items-start">
          {/* left sidebar */}
          <div className="min-h-screen bg-white border-2 shadow-md">
            <ul className="flex flex-col">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 hover:bg-gray-100 w-full p-4 ${
                    isActive && "bg-purple-100 border-r-4 border-purple-500"
                  }`
                }
                to={"/dashboard/manage-jobs"}
              >
                <RiHome3Line className="text-xl font-medium" />
                <p className="text-xl max-sm:hidden font-medium">
                  Manage Jodddbs
                </p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 hover:bg-gray-100 w-full p-4 ${
                    isActive && "bg-purple-100 border-r-4 border-purple-500"
                  }`
                }
                to={"/dashboard/add-job"}
              >
                <MdAddToQueue className="text-xl font-medium" />
                <p className="text-xl max-sm:hidden font-medium">Add Jobs</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 hover:bg-gray-100 w-full p-4 ${
                    isActive && "bg-purple-100 border-r-4 border-purple-500"
                  }`
                }
                to={"/dashboard/view-application"}
              >
                <FaStreetView className="text-xl font-medium" />
                <p className="text-xl max-sm:hidden font-medium">View Jobs</p>
              </NavLink>
            </ul>
          </div>
          <div className="flex-1 px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardData;
