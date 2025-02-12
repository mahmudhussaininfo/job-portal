import * as comapnyController from "../controller/companyController.js";
import * as jobController from "../controller/jobController.js";
import * as userController from "../controller/userController.js";
import express from "express";
import { upload } from "../utils/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import clerkMiddleware from "../middleware/clerkMiddleware.js";

const router = express.Router();

// user
router.get("/user", userController.getUserData);
router.post("/apply-job", userController.applyForNewJob);
router.get("/applied-jobs", userController.getUserAppliedJobs);
router.post("/job-resume", userController.updateUserResume);

// register comany
router.post("/register", upload, comapnyController.companyRegister);
router.post("/login", comapnyController.companyLogin);
router.get("/company", authMiddleware, comapnyController.companyDetails);
router.get("/company-delete", authMiddleware, comapnyController.companyLogout);

// post job
router.post("/job-add", authMiddleware, jobController.jobAdd);
router.get("/jobs", jobController.getJobs);
router.get("/list-jobs", authMiddleware, jobController.listJob);
router.get("/job/:id", jobController.getSingleJob);
router.post("/job-visibility", authMiddleware, jobController.jobVisibility);

export default router;
