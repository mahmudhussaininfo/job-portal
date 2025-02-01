import React, { useContext } from "react";
import { contextData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ManageJobs = () => {
  const { manageJobs } = useContext(contextData);
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <div>
        <h1 className="font-semibold text-xl py-5">Job Applied</h1>
        <table className="text-left bg-white border rounded-lg w-[60%]">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Job Title</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Applicants</th>
              <th className="py-3 px-4 border-b">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobs?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{item.title}</td>
                  <td className="py-2 px-4 border-b">
                    {moment(item.date).format("l")}
                  </td>
                  <td className="py-2 px-4 border-b">{item.location}</td>
                  <td className="py-2 px-4 border-b">{item.applicants}</td>
                  <td className="py-2 px-4 border-b">
                    <input className="cursor-pointer" type="checkbox" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-3 w-[60%] text-right">
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="bg-purple-500 m-1 text-white px-10 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageJobs;
