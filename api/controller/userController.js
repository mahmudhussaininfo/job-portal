import User from "../model/User.js";
import JobAplication from "../model/JobApplication.js";
import Job from "../model/Job.js";
import { cloudUpload } from "../utils/cloudinary.js";
import bycrpt from "bcryptjs";
import { tokenEncode } from "../utils/token.js";

export const getUserData = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "user get success", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// create user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    let photo = null;
    if (req.file) {
      const file = await cloudUpload(req);
      photo = file.secure_url;
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      photo,
      resume: "",
    });
    return res
      .status(200)
      .json({ status: true, message: "user created success", user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user does not exist" });
    }
    //password match
    const isMatch = await bycrpt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password is incorrect" });
    }
    // token
    const token = await tokenEncode(user._id);

    // option
    const options = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    // set cookies
    res.cookie("Token", token, options);

    return res.status(200).json({ message: "login successful", user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// apply for a job
export const applyForNewJob = async (req, res) => {
  const userId = req.auth?.userId;
  const { jobId } = req.body;

  if (!userId || !jobId) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no userId or jobId found" });
  }

  try {
    const alreadyApplied = await JobAplication.find({ userId, jobId });
    if (alreadyApplied.length > 0) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }
    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ message: "Job not found" });
    }
    const newJobs = await JobAplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      date: Date.now(),
    });
    return res.status(200).json({
      success: true,
      message: "Job Application submitted successfully",
      newJobs,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// user applied jobs
export const getUserAppliedJobs = async (req, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized, no userId found" });
  }

  try {
    const appliedJobs = await JobAplication.find({ userId })
      .populate("companyId", "name email photo")
      .populate("jobId", "title description location category level salary")
      .exec();
    if (!appliedJobs) {
      return res.status(404).json({
        success: false,
        message: "No job applications found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user applied jobs get success",
      appliedJobs,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update user profile resume
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized, no userId found" });
    }
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      const uploadFile = await cloudUpload(req);
      userData.resume = uploadFile.secure_url;
    }
    await userData.save();
    return res
      .status(200)
      .json({ success: true, message: "resumed successfully", userData });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
