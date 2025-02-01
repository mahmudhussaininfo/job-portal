import React, { useContext, useState } from "react";
import Layout from "../components/Layout/Layout";
import { RiUploadCloudLine } from "react-icons/ri";
import { contextData } from "./../context/AppContext";
import moment from "moment";

const Application = () => {
  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(null);

  const { appliedJobs } = useContext(contextData);
  console.log(appliedJobs);

  return (
    <>
      <Layout>
        <div className="min-h-screen">
          <div className="container mx-auto max-sm:flex max-sm:text-center max-sm:justify-center">
            <div>
              <div>
                <h1 className="text-xl font-semibold py-3">Your Resume</h1>
                {edit ? (
                  <>
                    <div className="flex gap-2">
                      <label
                        htmlFor="resume"
                        className="flex items-center gap-2"
                      >
                        <p className="bg-purple-100 m-1 border border-purple-400 text-black px-5 py-2 rounded-md">
                          Select Resume
                        </p>
                        <input
                          type="file"
                          id="resume"
                          accept="application/pdf"
                          hidden
                          onChange={(e) => setUpload(e.target.files[0])}
                        />
                        <div className="text-3xl bg-blue-500 text-white px-3 py-1">
                          <RiUploadCloudLine />
                        </div>
                      </label>
                      <button
                        onClick={() => setEdit(false)}
                        className="bg-purple-500 m-1 border border-purple-400 text-white px-5 py-2 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <button className="bg-purple-100 m-1 border border-purple-400 text-black px-5 py-2 rounded-md">
                        Resume
                      </button>
                      <button
                        onClick={() => setEdit(true)}
                        className="border border-gray-400 rounded bg-gray-50 px-5 py-2"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
              {/* job table */}
              <div>
                <h1 className="font-semibold text-xl py-5">Job Applied</h1>
                <table className="min-w-full text-left bg-white border rounded-lg">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 border-b">Job Title</th>
                      <th className="py-3 px-4 border-b">Company Name</th>
                      <th className="py-3 px-4 border-b">Location</th>
                      <th className="py-3 px-4 border-b">Date</th>
                      <th className="py-3 px-4 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedJobs?.map((item, index) => {
                      let bgColor;
                      if (item.status === "Pending") {
                        bgColor = "bg-blue-100 text-blue-600";
                      } else if (item.status === "Rejected") {
                        bgColor = "bg-red-100 text-red-600";
                      } else if (item.status === "Accepted") {
                        bgColor = "bg-green-50";
                      } else {
                        bgColor = "";
                      }
                      return (
                        <tr key={index}>
                          <td className="flex items-center gap-3 border-b py-3 px-4">
                            <img className="h-4" src={item.logo} alt="" />
                            {item.company}
                          </td>
                          <td className="border-b py-3 px-4">{item.title}</td>
                          <td className="border-b py-3 px-4">
                            {item.location}
                          </td>
                          <td className="border-b py-3 px-4">
                            {moment(item.date).format("LLL")}
                          </td>
                          <td
                            className={`${bgColor} py-2 rounded px-4 border-b text-center`}
                          >
                            {item.status}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Application;
