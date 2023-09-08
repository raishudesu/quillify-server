import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController";
import auth from "../middleware/auth";
import validateBlog from "../middleware/validateBlog";
import { createBlogSchema, updateBlogSchema } from "../lib/zodSchemas";

const router = Router();

// get all blogs
router.get("/", [auth], getBlogs);

// get a single blog
router.get("/:id", [auth], getBlog);

// post a new blog
router.post("/", [auth, validateBlog(createBlogSchema)], createBlog);

// delete a blog
router.delete("/:id", [auth], deleteBlog);

// update a blog
router.patch("/:id", [auth, validateBlog(updateBlogSchema)], updateBlog);

export { router as blogsRouter };
