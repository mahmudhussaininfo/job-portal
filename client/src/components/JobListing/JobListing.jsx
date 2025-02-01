import React, { useContext, useEffect, useState } from "react";
import { contextData } from "../../context/AppContext";
import { RxCross2 } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import { JobCategories, JobLocations } from "../../utils/utils.js";
import JobCard from "../JobCard/JobCard.jsx";

const JobListing = () => {
  const { search, setSearch, isSearch, setIsSearch, jobs } =
    useContext(contextData);

  const [showfilter, setShowFilter] = useState(false);
  const [current, setCurrent] = useState(1);

  const [selectCatagory, setSelectCatagory] = useState([]);

  const [selectLocation, setSelectLocation] = useState([]);

  const [filterJob, setFilterJob] = useState(jobs);

  const handleCatagoryChange = (item) => {
    if (selectCatagory.includes(item)) {
      setSelectCatagory(selectCatagory.filter((data) => data !== item));
    } else {
      setSelectCatagory([...selectCatagory, item]);
    }
  };

  const handleLocationChange = (item) => {
    if (selectLocation.includes(item)) {
      setSelectLocation(selectLocation.filter((data) => data !== item));
    } else {
      setSelectLocation([...selectLocation, item]);
    }
  };

  const ClearTitleSearch = () => {
    setSearch((prev) => ({
      ...prev,
      title: "",
    }));
  };
  const ClearLocationSearch = () => {
    setSearch((prev) => ({
      ...prev,
      location: "",
    }));
  };

  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      setFilterJob([]); // Set an empty array if jobs is undefined or empty
      return;
    }

    const matchCatagory = (job) =>
      selectCatagory.length === 0 || selectCatagory.includes(job.category);
    const matchLocation = (job) =>
      selectLocation.length === 0 || selectLocation.includes(job.location);
    const matchTitle = (job) =>
      search.title === "" ||
      job.title.toLowerCase().includes(search.title.toLowerCase());
    const matchSearhLocation = (job) =>
      search.location === "" ||
      job.location.toLowerCase().includes(search.location.toLowerCase());

    const newFilterJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchCatagory(job) &&
          matchLocation(job) &&
          matchTitle(job) &&
          matchSearhLocation(job)
      );
    setFilterJob(newFilterJobs);
    setCurrent(1);
  }, [jobs, search, selectCatagory, selectLocation]);

  return (
    <>
      <div className="container mx-auto 2xl:px-20 flex flex-col md:flex-row max-lg:space-y-8 p-3">
        {/* Sidebar */}
        <div className="w-full bg-white md:w-1/4 px-4">
          {/* search filter */}
          {isSearch && (search.title || search.location) && (
            <>
              <h2 className="md:text-2xl text-xl font-semibold mb-3">
                Custom Search
              </h2>
              <div className="flex gap-2 mb-5">
                {search.title && (
                  <div className="flex gap-2 border border-blue-400 rounded bg-blue-50 px-3 py-2">
                    <span>{search.title}</span>
                    <button onClick={ClearTitleSearch}>
                      <RxCross2 />
                    </button>
                  </div>
                )}
                {search.location && (
                  <div className="flex gap-2 border border-red-400 rounded bg-red-50 px-3 py-2">
                    <span>{search.location}</span>
                    <button onClick={ClearLocationSearch}>
                      <RxCross2 />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* show category filter button */}
          <button
            className="flex items-center gap-3 border rounded mb-5 py-3 px-4 md:hidden"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            {showfilter ? "Close" : "Filters"}
            {showfilter ? "" : <CiFilter />}
          </button>
          {/* Category filter */}
          <div className={showfilter ? "" : `max-md:hidden`}>
            <h2 className="text-xl font-semibold mb-2">Search By Categories</h2>
            <ul className="space-y-3 text-gray-600">
              {JobCategories &&
                JobCategories.map((item, index) => {
                  return (
                    <li key={index} className="flex gap-2">
                      <input
                        className="scale-125 cursor-pointer"
                        type="checkbox"
                        onChange={() => handleCatagoryChange(item)}
                        checked={selectCatagory.includes(item)}
                      />
                      {item}
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Location filter */}
          <div className={showfilter ? "" : `max-md:hidden`}>
            <h1 className="text-xl font-semibold mb-2 mt-10">
              Search By Location
            </h1>
            <ul className="space-y-3 text-gray-600">
              {JobLocations &&
                JobLocations.map((item, index) => {
                  return (
                    <li key={index} className="flex gap-2">
                      <input
                        className="scale-125 cursor-pointer"
                        type="checkbox"
                        onChange={() => handleLocationChange(item)}
                        checked={selectLocation.includes(item)}
                      />
                      {item}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* Job listing */}
        <div className="w-full md:w-3/4 max-lg:px-4">
          <h2 className="text-xl font-semibold mb-2" id="job-list">
            Latest Jobs
          </h2>
          <p className="mb-3">Get Your Job From Top Companies</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Job Card */}
            {filterJob &&
              filterJob
                .slice((current - 1) * 6, current * 6)
                .map((item, index) => {
                  return <JobCard key={index} jobs={item} />;
                })}
            {/* Job Card */}
          </div>
          {/* pagination */}
          {filterJob && filterJob.length > 0 && (
            <div className="flex justify-end items-center space-x-2 py-10">
              <a href="#job-list">
                <FaLongArrowAltLeft
                  onClick={() => setCurrent(Math.max(current - 1), 1)}
                />
              </a>
              {Array.from({ length: Math.ceil(filterJob.length / 6) }).map(
                (_, index) => (
                  <a href={`#job-list`}>
                    <button
                      onClick={() => setCurrent(index + 1)}
                      className={`rounded px-3 border border-gray-300 ${
                        current === index + 1
                          ? "bg-blue-50 text-blue-500"
                          : "text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </a>
                )
              )}
              <a href="#job-list">
                <FaLongArrowAltRight
                  onClick={() =>
                    setCurrent(
                      Math.min(current + 1, Math.ceil(filterJob.length / 6))
                    )
                  }
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobListing;
