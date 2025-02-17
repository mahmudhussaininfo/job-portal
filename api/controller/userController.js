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
      .json({ status: true, message: "User created successfully", user });
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

    const isProduction = process.env.NODE_ENV === "production";

    // option
    const options = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: "none",
      path: "/",
      domain: ".vercel.app",
    };

    // set cookies
    res.cookie("userToken", token, options);

    return res
      .status(200)
      .json({ status: true, message: "Login successful", user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// logout user
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      domain: ".vercel.app",
    });
    return res
      .status(200)
      .json({ success: true, message: "logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// apply for a job
export const applyForNewJob = async (req, res) => {
  const { id: userId, jobId } = req.body;
  try {
    if (!userId || !jobId) {
      return res
        .status(400)
        .json({ status: false, message: "User ID and Job ID are required" });
    }

    const alreadyApplied = await JobAplication.findOne({ userId, jobId });
    if (alreadyApplied) {
      return res.status(400).json({
        status: false,
        message: "You have already applied for this Job",
      });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ message: "Job not found" });
    }

    const newJobApplication = await JobAplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      date: Date.now(),
    });

    return res.status(200).json({
      success: true,
      message: "Job Application submitted successfully",
      newJobApplication,
    });
  } catch (error) {
    console.error("Error applying for job:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// user applied jobs
export const getUserAppliedJobs = async (req, res) => {
  const { id: userId } = req.body;

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
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      const uploadFile = await cloudUpload(req);
      user.resume = uploadFile.secure_url;
    }
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "resumed successfully", user });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
