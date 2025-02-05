import Job from "../model/Job.js";

export const jobAdd = async (req, res) => {
  try {
    const companyId = req.body.id;

    const { title, description, location, category, level, salary } = req.body;
    const newJob = await Job.create({
      companyId,
      title,
      description,
      location,
      category,
      level,
      salary,
      date: Date.now(),
    });
    return res.status(200).json({ message: "job created done", newJob });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// get jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate({
      path: "companyId",
      select: "name email photo",
    });
    return res
      .status(200)
      .json({ success: true, message: "jobs fetched successfully", jobs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//single jobs data
export const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "name email photo",
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "job fetched successfully", job });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// list jobs
export const listJob = async (req, res) => {
  const { id: companyId } = req.body;
  try {
    const jobs = await Job.find({ companyId });
    if (!jobs) {
      return res
        .status(404)
        .json({ success: false, message: "No jobs found for this company" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Jobs fetched successfully", jobs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// jobs visibility
export const jobVisibility = async (req, res) => {
  // or
  const { _id: jobId, id: companyId } = req.body;
  try {
    // const { _id } = req.body;
    // const jobId = _id;
    // const companyId = req.body.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.companyId.toString() === companyId.toString()) {
      job.visible = !job.visible;
    }
    await job.save();
    return res.status(200).json({ message: "job success", job });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
