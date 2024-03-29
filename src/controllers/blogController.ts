import Blogs from "../models/blogModel";
import mongoose from "mongoose";
import { Request, Response } from "express";

//get all blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blogs.find({}).sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get a single blog
export const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "No such blog!" });
    }

    const blogs = await Blogs.findById(id);

    if (!blogs) {
      console.log("No such blog");
      return res.status(400).json({ success: false, error: "No such blog!" });
    }

    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserBlogs = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    if (!authorId)
      return res
        .status(400)
        .json({ success: false, message: "No author ID defined!" });

    const blogs = await Blogs.find({ authorId }).sort({ createdAt: -1 });

    if (blogs.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No blogs available!" });
    }

    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// create a new blog
export const createBlog = async (req: Request, res: Response) => {
  const { title, summary, content, author, authorId, tags } = req.body;

  // add doc to db
  try {
    const blog = await Blogs.create({
      title,
      summary,
      content,
      author,
      authorId,
      tags,
    });
    res.status(200).json(blog);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// delete a blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ success: false, error: "No such blog!" });
    }

    const blog = await Blogs.findOneAndDelete({ _id: postId });

    if (!blog) {
      res.status(400).json({ success: false, error: "No such blog!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Blog deleted!", blogDeleted: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// update a blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ success: false, error: "No such blog!" });
    }

    const blog = await Blogs.findOneAndUpdate(
      { _id: postId },
      {
        ...req.body,
      }
    );

    if (!blog) {
      res.status(400).json({ success: false, error: "No such blog!" });
    }

    res.status(200).json({ success: true, message: "Post updated" });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const searchBlogs = async (req: Request, res: Response) => {
  try {
    const { searchParams } = req.params;

    const keywords = searchParams.split(" ");

    const blogs = await Blogs.find({ tags: { $in: keywords } }).exec();

    res.json(blogs);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
