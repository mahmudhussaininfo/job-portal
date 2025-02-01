import React, { useContext } from "react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { contextData } from "../../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { showRecrut, setShowRecrut } = useContext(contextData);

  return (
    <>
      <div className="shadow-md">
        <div className="container mx-auto flex justify-between items-center px-5">
          <div>
            <img
              onClick={() => navigate("/")}
              className="w-20 h-20 cursor-pointer"
              src={logo}
              alt=""
            />
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/application">Apply Job</Link>
              <p>|</p>
              <p>{user.fullName}</p>
              <UserButton />
            </div>
          ) : (
            <div className="flex gap-5">
              <button onClick={() => setShowRecrut(true)} className="">
                Recruter Login
              </button>
              <button
                onClick={(e) => openSignIn()}
                className="bg-purple-500 text-white px-7 rounded-full py-2"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
