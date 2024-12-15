const Project = require("../models/projectSchema");

const csvParser = require("csv-parser");
const { Parser } = require("json2csv");

const createProject = async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      details: req.body.details,
      dueDate: req.body.dueDate,
      createdBy: req.user._id,
    });

    await project.save();
    res.status(201).json({ message: "project created...", project: project });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    let user = req.user;
    let { id } = req.params;
    let project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    if (project.createdBy.toString() !== user.id) {
      return res
        .status(403)
        .json({ message: "you are not authorized to update this project" });
    }
    project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "project updated", project: project });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error updating user", error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    let user = req.user;
    let { id } = req.params;
    let project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    if (project.createdBy.toString() !== user.id) {
      return res
        .status(403)
        .json({ message: "you are not authorized to delete this project" });
    }
    res.status(200).json({ message: "project deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error deleting user", error: error.message });
  }
};

const getallprojects = async (req, res) => {
  try {
    let projects = await Project.find();
    res.status(200).json({ message: "projects fetched", projects: projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching projects", error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    let { id } = req.params;
    let project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    res.status(200).json({ message: "project fetched", project: project });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching project", error: error.message });
  }
};

const importCsv = async (req, res) => {
  try {
    // Check if file exists in memory storage
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const buffer = req.file.buffer;
    const projects = [];

    const stream = require("stream").Readable.from(buffer);
    stream
      .pipe(csvParser())
      .on("data", (row) => {
        projects.push(row);
      })
      .on("end", async () => {
        const formattedProjects = projects.map((project) => ({
          title: project.title,
          details: project.details,
          dueDate: new Date(project.dueDate),
          createdBy: req.user._id,
          status: "active",
          payment: "pending",
        }));

        await Project.insertMany(formattedProjects);
        res.status(200).json({ message: "Projects imported successfully" });
      })
      .on("error", (error) => {
        res
          .status(500)
          .json({ message: "Error parsing CSV file", error: error.message });
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error importing projects", error: error.message });
  }
};

const exportCsv = async (req, res) => {
  try {
    const projects = await Project.find();

    const csvData = projects.map((project) => ({
      title: project.title,
      details: project.details,
      dueDate: project.dueDate.toISOString().split("T")[0],
      createdBy: project.createdBy,
      status: project.status,
      payment: project.payment,
    }));

    const json2csv = new Parser({
      fields: ["title", "details", "dueDate", "createdBy", "status", "payment"],
    });
    const csv = json2csv.parse(csvData);

    const fileName = "projects.csv";
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    res.status(200).send(csv);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error exporting projects", error: error.message });
  }
};

const submitProject = async (req, res) => {
  try {
    let { id } = req.params;
    let project = await Project.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    res.status(200).json({ message: "project updated", project: project });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error updating user", error: error.message });
  }
};

const submitPayement = async (req, res) => {
  try {
    let { id } = req.params;
    let project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    if (project.status !== "completed") {
      return res.status(403).json({ message: "project not completed" });
    }
    if (project.payment === "completed") {
      return res.status(403).json({ message: "payment already completed" });
    }
    await Project.findByIdAndUpdate(
      id,
      { payment: "completed" },
      { new: true }
    );
    res.status(200).json({ message: "project updated", project: project });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error updating user", error: error.message });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getallprojects,
  getProjectById,
  importCsv,
  exportCsv,
  submitProject,
  submitPayement,
};
