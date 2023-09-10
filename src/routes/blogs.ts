import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  getUserBlogs,
} from "../controllers/blogController";
import auth from "../middleware/auth";
import validateBlog from "../middleware/validateBlog";
import { createBlogSchema, updateBlogSchema } from "../lib/zodSchemas";

const router = Router();

// get all blogs
router.get("/", getBlogs);

// get a single blog
router.get("/:id", getBlog);

// get current user's blogs
router.get("/getUserBlogs/:authorId", getUserBlogs);

// post a new blog
router.post("/", [auth, validateBlog(createBlogSchema)], createBlog);

// delete a blog
router.delete("/:id", [auth], deleteBlog);

// update a blog
router.patch("/:id", [auth, validateBlog(updateBlogSchema)], updateBlog);

export { router as blogsRouter };
