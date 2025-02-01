import { createContext, useEffect, useState } from "react";
import {
  JobsData,
  JobsApplied,
  ViewApplicationsPageData,
  ManageJobsData,
} from "../utils/utils";

export const contextData = createContext();

export const ContextProvider = ({ children }) => {
  const [search, setSearch] = useState({
    title: "",
    location: "",
  });

  const [isSearch, setIsSearch] = useState(false);

  const [jobs, setJobs] = useState();
  const [appliedJobs, setAppliedJobs] = useState(null);
  const [viewApplication, setViewApplication] = useState(null);
  const [manageJobs, setManageJobs] = useState(null);
  const [showRecrut, setShowRecrut] = useState(false);

  const fetchJobsData = () => {
    setJobs(JobsData);
  };
  const fetchmanageJobsData = () => {
    setManageJobs(ManageJobsData);
  };

  const fetchViewApplicationData = () => {
    setViewApplication(ViewApplicationsPageData);
  };

  const fetchAppliedJobsData = () => {
    setAppliedJobs(JobsApplied);
  };

  useEffect(() => {
    fetchJobsData();
    fetchAppliedJobsData();
    fetchViewApplicationData();
    fetchmanageJobsData();
  }, []);

  const value = {
    search,
    setSearch,
    isSearch,
    setIsSearch,
    jobs,
    appliedJobs,
    showRecrut,
    setShowRecrut,
    viewApplication,
    manageJobs,
  };

  return <contextData.Provider value={value}>{children}</contextData.Provider>;
};
