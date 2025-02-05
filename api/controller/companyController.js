import Company from "../model/Company.js";
import { cloudUpload } from "../utils/cloudinary.js";
import bycrpt from "bcryptjs";
import { tokenEncode } from "../utils/token.js";

// company register
export const companyRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // user exists
    const existingUser = await Company.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Company already exists with that email" });
    }

    // photo uploads
    let photo = null;
    if (req.file) {
      const file = await cloudUpload(req);
      photo = file.secure_url;
    }

    // hash password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    // create new company
    const newComany = await Company.create({
      name,
      email,
      password: hashedPassword,
      photo: photo,
    });

    return res.json({
      success: true,
      message: "Company registered successfully",
      newComany,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// company login
export const companyLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: "Company does not exist" });
    }
    //password match
    const isMatch = await bycrpt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password is incorrect" });
    }
    // token
    const token = await tokenEncode(company._id);

    // option
    const options = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    // set cookies
    res.cookie("Token", token, options);

    return res
      .status(200)
      .json({ message: "login successful", company, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get company
export const companyDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const company = await Company.findById(id).select("-password");
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "company details succed", company });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
