const { Router } = require("express");
const {
  getallprojects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  exportCsv,
  importCsv,
  submitProject,
  submitPayement,
} = require("../controllers/projectController");
const auth = require("../middlewares/auth");
const upload = require("../utils/multer");

const projectRouter = Router();

projectRouter.get("/all", getallprojects);
projectRouter.get("/project/:id", auth, getProjectById);
projectRouter.get("/export", auth, exportCsv);
projectRouter.post("/create", auth, createProject);
projectRouter.post("/import", auth, upload.single("file"), importCsv);
projectRouter.post("/submit/:id", auth, submitProject);
projectRouter.post("/payment/:id", auth, submitPayement);
projectRouter.patch("/update/:id", auth, updateProject);
projectRouter.delete("/delete/:id", auth, deleteProject);

module.exports = projectRouter;
