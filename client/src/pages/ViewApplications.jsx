import React, { useContext } from "react";
import { contextData } from "../context/AppContext";
import { AiOutlineDownload } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const ViewApplications = () => {
  const { viewApplication } = useContext(contextData);

  return (
    <>
      {/* job table */}
      <div>
        <h1 className="font-semibold text-xl py-5">Job Applied</h1>
        <table className="text-center bg-white border rounded-lg min-w-[60%]">
          <thead className="">
            <tr>
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">User Name</th>
              <th className="py-3 px-4 border-b">Job Title</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Resume</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplication?.map((item, index) => (
              <tr key={index} className="bg-gray-50 border-t-2">
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b flex items-center gap-3">
                  <img src={item.imgSrc} alt="" />
                  {item.name}
                </td>
                <td className="py-2 px-4 border-b">{item.jobTitle}</td>
                <td className="py-2 px-4 border-b">{item.location}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="flex font-semibold py-2 px-3 text-blue-500 bg-blue-100 gap-2 items-center rounded"
                    href={item.resume}
                    target="_blank"
                  >
                    View Resume
                    <AiOutlineDownload />
                  </button>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {item.status}
                </td>
                <td className="py-2 px-4 border-b relative text-left">
                  {" "}
                  <div className="relative inline-block text-left group">
                    <button className="text-2xl cursor-pointer">
                      <HiOutlineDotsHorizontal />
                    </button>
                    <div className="z-30 absolute right-0 top-4 flex-col items-center bg-white hidden group-hover:block shadow-md w-32">
                      <button className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-500">
                        Accept
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-500">
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewApplications;
