const { Router } = require("express");
const validator = require("../middlewares/auth");
const {
  createBlog,
  allBlogs,
  singleBlog,
  sortBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const blogRouter = Router();

blogRouter.get("/", allBlogs);
blogRouter.get("/sort", sortBlog);
blogRouter.get("/:id", validator, singleBlog);
blogRouter.post("/create", validator, createBlog);
blogRouter.patch("/update/:id", validator, updateBlog);
blogRouter.delete("/delete/:id", validator, deleteBlog);
module.exports = blogRouter;
