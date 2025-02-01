import React from "react";
import { assets } from "../../../public/assets";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-700 text-white">
        <div className="container flex items-center justify-between mx-auto">
          <div>
            <img className="w-20 h-20" src={assets.logo} alt="" />
          </div>
          <div className="flex-1 flex items-center gap-3 max-sm:hidden">
            <p className="text-2xl">|</p>
            <p className="text-gray-300 ">
              All right reserved. Copyright @job-portal
            </p>
          </div>
          <div className="">
            <ul className="flex gap-3">
              <li>
                <button className="border hover:bg-purple-800 hover:border-purple-800 transition-all border-gray-200 rounded-full p-2">
                  <FaFacebook />
                </button>
              </li>
              <li>
                <button className="border hover:bg-purple-800 hover:border-purple-800 transition-all border-gray-200 rounded-full p-2">
                  <FaInstagram />
                </button>
              </li>
              <li>
                <button className="border hover:bg-purple-800 hover:border-purple-800 transition-all border-gray-200 rounded-full p-2">
                  <FaLinkedinIn />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
