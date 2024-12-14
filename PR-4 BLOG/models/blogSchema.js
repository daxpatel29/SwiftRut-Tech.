const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: "string", required: true },
  content: { type: "string", required: true },
  category: { type: "string", required: true },
  date: { type: "date", default: Date.now() },
  author: { type: "string" },
});

const Blog = new mongoose.model("blog", blogSchema);

module.exports = Blog;
