import * as comapnyController from "../controller/companyController.js";
import express from "express";
import { upload } from "../utils/multer.js";

const router = express.Router();

// register comany
router.post("/register", upload, comapnyController.companyRegister);
router.post("/login", comapnyController.comanyLogin);

export default router;
