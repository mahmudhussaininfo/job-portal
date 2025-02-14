import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { contextData } from "../context/AppContext";
import Loading from "../components/Loading/Loading";
import kconvert from "k-convert";
import moment from "moment";
import { PiStackOverflowLogo } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import JobCard from "../components/JobCard/JobCard";
import { toast } from "react-toastify";
import axios from "axios";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { jobs, BaseUrl, user } = useContext(contextData);
  const [jobsData, setJobsData] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/job/${id}`);
      if (data) {
        setJobsData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {
      if (!user) {
        return toast.error("login to apply for jobs");
      }
      if (!user.resume) {
        navigate("/application");
        return toast.error("upload your resume first");
      }
      const { data } = await axios.post(
        `${BaseUrl}/api/apply-job`,
        { jobId: jobsData._id },
        { withCredentials: true }
      );
      if (data) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return jobs ? (
    <>
      <Layout>
        <div className="min-h-screen">
          <div className="md:w-2/3 max-sm:px-5 md:mx-auto mb-10">
            {/* hero section */}
            <div className="md:h-80 mt-10 rounded-md shadow-md border border-blue-400 p-6 bg-blue-50 gap-5 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <img className="h-10" src={jobsData?.companyId.photo} alt="" />
              </div>
              <div className="md:flex-1">
                <div>
                  <h1 className="md:text-4xl font-semibold mb-3">
                    {jobsData?.title}
                  </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl">
                      <PiStackOverflowLogo />
                    </span>
                    <span>{jobsData?.companyId.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl">
                      <CiLocationOn />
                    </span>
                    <span>{jobsData?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl">
                      <MdOutlinePersonOutline />
                    </span>
                    <span>{jobsData?.level}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl">
                      <MdAttachMoney />
                    </span>
                    <span>{kconvert.convertTo(jobsData?.salary)}</span>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={applyHandler}
                  className="bg-purple-500 m-1 text-white px-7 py-2 rounded-md"
                >
                  Apply Now
                </button>
                <p className="md:text-center">
                  {moment(jobsData?.date).fromNow()}
                </p>
              </div>
            </div>
            {/* job description */}
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3">
                <h1 className="text-3xl font-semibold py-10">
                  Job Description
                </h1>
                <p
                  className="rich-text md:w-3/4"
                  dangerouslySetInnerHTML={{ __html: jobsData?.description }}
                ></p>
                <button className="bg-purple-500 m-1 mt-8 text-white px-7 py-2 rounded-md">
                  Apply Now
                </button>
              </div>
              {/* more jobs */}
              <div className="md:w-2/6 mt-10">
                <h1 className="md:text-2xl text-xl font-semibold">
                  More Jobs From Stack
                </h1>
                {jobs
                  .filter(
                    (job) =>
                      job?._id !== jobsData?._id &&
                      job?.companyId?._id === jobsData?.companyId?._id
                  )
                  .filter((job) => true)
                  .slice(0, 3)
                  .map((item, index) => (
                    <JobCard jobs={item} key={index} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
