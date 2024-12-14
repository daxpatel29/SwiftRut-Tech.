const Blog = require("../models/blogSchema");

const allBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({}).sort({ date: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "error fetching blogs", error });
  }
};

const singleBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: "error fetching blog", error });
  }
};

const createBlog = async (req, res) => {
  try {
    let { title, content } = req.body;
    // console.log("1");

    let user = req.user;
    // console.log("2" + user);
    let blog = await Blog.create({ title, content, author: user.username });
    // console.log("3" + blog);

    res.status(200).json({ message: "blog published", blog });
  } catch (error) {
    res.status(500).json({ message: "error creating blog", error });
  }
};

const updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    // console.log(blog.author + req.user.username);

    if (blog.author == req.user.username) {
      blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json({ message: "blog updated", blog });
    } else {
      return res
        .status(403)
        .json({ message: "you are not authorized to update this blog" });
    }
  } catch (error) {
    res.status(500).json({ message: "error updating blog", error });
  }
};

const deleteBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    if (blog.author == req.user.username) {
      blog = await Blog.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "blog deleted" });
    } else {
      return res
        .status(403)
        .json({ message: "you are not authorized to delete this blog" });
    }
  } catch (error) {
    res.status(500).json({ message: "error deleting blog", error });
  }
};

const sortBlog = async (req, res) => {
  try {
    let { sortDate, category, author } = req.query;

    let query = {};
    if (category) query.category = category;
    if (author) query.author = author;

    let sortOrder = sortDate == "desc" ? -1 : 1;

    let blogs = await Blog.find(query).sort({ [sortDate]: sortOrder });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "error fetching blogs", error });
  }
};
module.exports = {
  createBlog,
  allBlogs,
  singleBlog,
  sortBlog,
  updateBlog,
  deleteBlog,
};
