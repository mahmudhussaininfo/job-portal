import React, { useContext, useEffect, useState } from "react";
import { contextData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

const ManageJobs = () => {
  const { BaseUrl } = useContext(contextData);
  const navigate = useNavigate();

  const [job, setJob] = useState([]);

  // job visibility change
  const jobVissible = async (_id) => {
    try {
      const { data } = await axios.post(
        `${BaseUrl}/api/job-visibility`,
        {
          _id,
        },
        { withCredentials: true }
      );
      if (data) {
        toast.success(data.message);
        fetchJobs();
      } else {
        toast.error("Failed to update job visibility");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/list-jobs`, {
        withCredentials: true,
      });
      if (data) {
        setJob(data.jobData.reverse());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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
            {job?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{item.title}</td>
                  <td className="py-2 px-4 border-b">
                    {moment(item.date).format("llll")}
                  </td>
                  <td className="py-2 px-4 border-b">{item.location}</td>
                  <td className="py-2 px-4 border-b">{item.applicantsCount}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      onChange={() => jobVissible(item._id)}
                      checked={item.visible}
                      className="cursor-pointer"
                      type="checkbox"
                    />
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
