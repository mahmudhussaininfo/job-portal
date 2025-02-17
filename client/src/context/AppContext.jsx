import { createContext, useEffect, useState } from "react";
import {
  JobsData,
  JobsApplied,
  ViewApplicationsPageData,
  ManageJobsData,
} from "../utils/utils";
import axios from "axios";
import { toast } from "react-toastify";

export const contextData = createContext();
const BaseUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_URL
    : import.meta.env.VITE_LIVE_BACKEND_URL;

export const ContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [search, setSearch] = useState({
    title: "",
    location: "",
  });

  const [isSearch, setIsSearch] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(null);
  const [viewApplication, setViewApplication] = useState(null);
  const [manageJobs, setManageJobs] = useState(null);
  const [showRecrut, setShowRecrut] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [companyJobDetails, setCompanyJobDetails] = useState([]);
  const [application, setApplication] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/user`, {
        withCredentials: true,
      });
      if (data) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      toast.error(error.message);
    }
  };

  const fetchJobsData = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/jobs`);
      if (data) {
        setJobs(data.jobs);
      } else {
        toast.error("Failed to fetch jobs.");
      }
    } catch (error) {
      toast.error(error.message);
    }
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

  const fetchAuthData = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/company`, {
        withCredentials: true,
      });
      if (data) {
        setIsAuthenticated(true);
        setCompanyData(data.company);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setCompanyData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyJobDetails = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/company-jobDetais`, {
        withCredentials: true,
      });
      if (data) {
        setCompanyJobDetails(data.applicants);
      } else {
        toast.error("Failed to fetch company job details.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserApplied = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/api/applied-jobs`, {
        withCredentials: true,
      });
      if (data) {
        setApplication(data.appliedJobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJobsData();
    fetchAppliedJobsData();
    fetchViewApplicationData();
    fetchmanageJobsData();
    fetchAuthData();
    fetchUser();
    fetchCompanyJobDetails();
    fetchUserApplied();
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
    BaseUrl,
    companyData,
    setCompanyData,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    user,
    fetchUser,
    companyJobDetails,
    fetchCompanyJobDetails,
    application,
    fetchUserApplied,
  };

  return <contextData.Provider value={value}>{children}</contextData.Provider>;
};
