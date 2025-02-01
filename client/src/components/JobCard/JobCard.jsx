import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ jobs }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-5">
        <div>
          <img className="h-6" src={jobs.companyId.image} alt="" />
        </div>
        <div>
          <h3 className="font-semibold py-3">{jobs.title}</h3>
        </div>
        <div className="flex gap-2 mb-3 text-sm">
          <span className="border border-blue-400 rounded bg-blue-50 px-3 py-2">
            {jobs.location}
          </span>
          <span className="border border-red-400 rounded bg-red-50 px-3 py-2">
            {jobs.level}
          </span>
        </div>
        <div>
          <p
            dangerouslySetInnerHTML={{ __html: jobs.description.slice(0, 150) }}
          ></p>
        </div>
        <div className="mt-5 text-sm">
          <button
            onClick={() => navigate(`/apply/${jobs._id}`)}
            className="bg-purple-500 m-1 text-white px-5 py-2 rounded-md"
          >
            Apply Now
          </button>
          <button
            onClick={() => navigate(`/apply/${jobs._id}`)}
            className="bg-white-500 border border-gray-400 m-1  px-5 py-2 rounded-md"
          >
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default JobCard;
