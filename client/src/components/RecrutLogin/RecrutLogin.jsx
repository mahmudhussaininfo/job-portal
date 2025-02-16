import React, { useContext, useEffect, useState } from "react";
import { contextData } from "../../context/AppContext";
import { RxCross2 } from "react-icons/rx";
import { IoIosPerson } from "react-icons/io";
import { FaRegEnvelope, FaLock } from "react-icons/fa";
import { assets } from "../../../public/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecrutLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("login");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [img, setImg] = useState(false);
  const [isDataSubmited, setIsDataSubmited] = useState(false);
  const {
    setShowRecrut,
    BaseUrl,
    companyData,
    setCompanyData,
    setIsAuthenticated,
  } = useContext(contextData);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === "Sign Up" && !isDataSubmited) {
      return setIsDataSubmited(true);
      // login logic
    }

    try {
      if (state === "login") {
        const { data } = await axios.post(`${BaseUrl}/api/login`, {
          email: input.email,
          password: input.password,
        });
        if (data) {
          setCompanyData(data.company);
          setShowRecrut(false);
          setIsAuthenticated(true);
          navigate("/dashboard");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("photo", img);
        const { data } = await axios.post(`${BaseUrl}/api/register`, formData);
        if (data) {
          setCompanyData(data.company);
          setShowRecrut(false);
          setIsAuthenticated(true);
          navigate("/dashboard");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-10 
      bg-black/50 flex justify-center items-center"
      >
        <div className="bg-white p-10 relative flex flex-col items-center rounded-lg">
          <button
            onClick={() => setShowRecrut(false)}
            className="right-3 top-3 absolute "
          >
            <RxCross2 />
          </button>
          <h1 className="text-2xl">
            {state === "login" ? "Recruiter Login" : "Recruiter Sign Up"}
          </h1>
          <p className="font-light">Welcome back! Please sign in to continue</p>
          <div>
            <form onSubmit={handleSubmit}>
              {state === "Sign Up" && isDataSubmited ? (
                <>
                  <div className="text-center flex flex-col items-center py-5">
                    <label htmlFor="image">
                      <img
                        className="cursor-pointer h-40 w-40 rounded-full"
                        src={img ? URL.createObjectURL(img) : assets.avatar}
                        alt=""
                      />

                      <input
                        onChange={(e) => setImg(e.target.files[0])}
                        type="file"
                        hidden
                        id="image"
                      />
                    </label>
                    <span className="mt-2">Upload Logo</span>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  {state === "Sign Up" && (
                    <div className="border rounded-full flex items-center px-3 mt-5">
                      <IoIosPerson />
                      <input
                        className="outline-none border-none px-3 py-2"
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        placeholder="Name"
                      />
                    </div>
                  )}
                  <div className="border rounded-full flex items-center px-3 mt-3">
                    <FaRegEnvelope />
                    <input
                      className="outline-none border-none px-3 py-2"
                      type="text"
                      name="email"
                      value={input.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                  <div className="border rounded-full flex items-center px-3 mt-3">
                    <FaLock />
                    <input
                      className="outline-none border-none px-3 py-2"
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                </>
              )}

              {state === "login" && (
                <div className="mt-1">
                  <p className="text-blue-600">Forget Password</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="bg-purple-500 w-full mt-5 text-white px-7 rounded-full py-2"
                >
                  {state === "login"
                    ? "Login Now"
                    : isDataSubmited
                    ? "Sign Up"
                    : "next"}
                </button>
              </div>
              <div>
                {state === "login" ? (
                  <p className="mt-3 text-center">
                    Don’t have an account?
                    <span
                      className="text-blue-700 font-semibold cursor-pointer ml-1"
                      onClick={() => setState("Sign Up")}
                    >
                      Sign up
                    </span>
                  </p>
                ) : (
                  <p className="mt-3 text-center">
                    Already have an account?
                    <span
                      onClick={() => setState("login")}
                      className="text-blue-700 font-semibold cursor-pointer ml-1"
                    >
                      Login
                    </span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecrutLogin;
