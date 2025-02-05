import mongoose from "mongoose";

// jobSchema
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Job = mongoose.model("jobs", jobSchema);
export default Job;
