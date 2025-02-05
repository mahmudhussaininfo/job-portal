import * as comapnyController from "../controller/companyController.js";
import * as jobController from "../controller/jobController.js";
import express from "express";
import { upload } from "../utils/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// register comany
router.post("/register", upload, comapnyController.companyRegister);
router.post("/login", comapnyController.companyLogin);
router.get("/company", authMiddleware, comapnyController.companyDetails);

// post job
router.post("/job-add", authMiddleware, jobController.jobAdd);
router.get("/jobs", jobController.getJobs);
router.get("/list-jobs", authMiddleware, jobController.listJob);
router.get("/job/:id", jobController.getSingleJob);
router.post("/job-visibility", authMiddleware, jobController.jobVisibility);

export default router;
