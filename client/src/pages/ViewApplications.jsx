import React, { useContext } from "react";
import { contextData } from "../context/AppContext";
import { AiOutlineDownload } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";

const ViewApplications = () => {
  const { companyJobDetails, BaseUrl, fetchCompanyJobDetails } =
    useContext(contextData);

  const resumeUpdate = async (id, status) => {
    try {
      const { data } = await axios.post(`${BaseUrl}/update-status`, {
        id,
        status,
      });
      if (data) {
        toast.success(data.message);
        await fetchCompanyJobDetails();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
            {companyJobDetails?.map((item, index) => (
              <tr key={index} className="bg-gray-50 border-t-2">
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b flex items-center gap-3">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={item.userId.photo}
                    alt=""
                  />
                  {item.userId.name}
                </td>
                <td className="py-2 px-4 border-b">{item.jobId.title}</td>
                <td className="py-2 px-4 border-b">{item.jobId.location}</td>
                <td className="py-2 px-4 border-b">
                  <a
                    className="flex font-semibold py-2 px-3 text-blue-500 bg-blue-100 gap-2 items-center rounded"
                    href={item.userId.resume}
                    target="_blank"
                  >
                    View Resume
                    <AiOutlineDownload />
                  </a>
                </td>
                {item.status === "Pending" ? (
                  <td className="py-2 px-4 border-b relative text-left">
                    <div className="relative inline-block text-left group">
                      <button className="text-2xl cursor-pointer">
                        <HiOutlineDotsHorizontal />
                      </button>
                      <div className="z-30 absolute right-0 top-4 flex-col items-center bg-white hidden group-hover:block shadow-md w-32">
                        <button
                          onClick={() => resumeUpdate(item._id, "Acepeted")}
                          className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-500"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => resumeUpdate(item._id, "Rejected")}
                          className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </td>
                ) : (
                  <td className="py-2 px-4 border-b text-center">
                    {item.status}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewApplications;
