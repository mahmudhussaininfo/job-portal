import Quill from "quill";
import React, { useContext, useEffect, useRef, useState } from "react";
import { JobCategories, JobLocations } from "../utils/utils";
import axios from "axios";
import { contextData } from "../context/AppContext";
import { toast } from "react-toastify";

const AddJobs = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { BaseUrl } = useContext(contextData);

  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    location: "",
    salary: "100",
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // add job logic here
      const description = quillRef.current.root.innerHTML;
      const { data } = await axios.post(
        `${BaseUrl}/api/job-add`,
        {
          title: input.title,
          description,
          category: input.category,
          level: input.level,
          location: input.location,
          salary: input.salary,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        toast.success(data.message);
        setInput({
          title: "",
          description: "",
          category: "",
          level: "",
          location: "",
          salary: 0,
        });
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter job description...",
      });
      quillRef.current = quill;
    }
  }, []);
  return (
    <>
      <div className="container p-4 flex flex-col w-full items-start gap-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 w-full">
            <h2>Job Title</h2>
            <input
              className="px-3 mt-2 w-full py-2 border-2 rounded outline-none"
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
              placeholder="Type here"
            />
          </div>
          <div>
            <h2 className="mb-2 w-full">Job Description</h2>
            <p
              name="description"
              value={input.description}
              onChange={handleChange}
              ref={editorRef}
            ></p>
          </div>
          {/* dropdown */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mt-3 w-full">
            <div className="">
              <h2>Job Category</h2>
              <select
                className="w-full mt-2 p-2 border-2 rounded outline-none"
                name="category"
                value={input.category}
                onChange={handleChange}
              >
                {JobCategories.map((category, index) => {
                  return (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="">
              <h2>Job Location</h2>
              <select
                className="w-full mt-2 p-2 border-2 rounded outline-none"
                name="location"
                value={input.location}
                onChange={handleChange}
              >
                {JobLocations.map((location, index) => {
                  return (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="">
              <h2>Job Category</h2>
              <select
                className="w-full mt-2 p-2 border-2 rounded outline-none"
                name="level"
                value={input.level}
                onChange={handleChange}
              >
                <option value="Junior Level">-Select-level-</option>
                <option value="Junior Level">Junior Level</option>
                <option value="Middium Level">Middium Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>
          </div>
          <div className="mt-3 w-full">
            <h2>Job Salary</h2>
            <input
              className="px-3 mt-2 w-full py-2 border-2 rounded outline-none"
              type="text"
              placeholder="Type here"
              name="salary"
              value={input.salary}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="bg-purple-500 m-1 text-white px-10 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddJobs;
