import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "users",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    date: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const JobApplication = mongoose.model("jobApplications", jobApplicationSchema);

export default JobApplication;
