import Blogs from "../models/blogModel";
import mongoose from "mongoose";
import { Request, Response } from "express";

//get all blogs
export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blogs.find({}).sort({ createdAt: -1 });

  res.status(200).json(blogs);
};

// get a single blog
export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog!" });
  }

  const blogs = await Blogs.findById(id);

  if (!blogs) {
    res.status(400).json({ error: "No such blog!" });
  }

  res.status(200).json(blogs);
};

// create a new blog
export const createBlog = async (req: Request, res: Response) => {
  const { title, summary, content, author, authorId } = req.body;

  // add doc to db
  try {
    const blog = await Blogs.create({
      title,
      summary,
      content,
      author,
      authorId,
    });
    res.status(200).json(blog);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// delete a blog
export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog!" });
  }

  const blog = await Blogs.findOneAndDelete({ _id: id });

  if (!blog) {
    res.status(400).json({ error: "No such blog!" });
  }

  res.status(200).json(blog);
};

// update a blog
export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog!" });
  }

  const blog = await Blogs.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!blog) {
    res.status(400).json({ error: "No such blog!" });
  }

  res.status(200).json(blog);
};
