import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  getUserBlogs,
} from "../controllers/blogController";
import { checkToken, checkUniqueToken } from "../middleware/auth";
import { createBlogSchema, updateBlogSchema } from "../lib/zodSchemas";
import validateSchema from "../middleware/validateSchema";

const router = Router();

// get all blogs
router.get("/getBlogs", getBlogs);

// get a single blog
router.get("/getBlog/:id", getBlog);

// get current user's blogs
router.get("/getUserBlogs/:authorId", getUserBlogs);

// post a new blog
router.post(
  "/createBlog",
  [checkToken, validateSchema(createBlogSchema)],
  createBlog
);

// delete a blog
router.delete("/deleteBlog/:id", [checkToken], deleteBlog);

// update a blog
router.patch(
  "/updateBlog/:id",
  [checkToken, validateSchema(updateBlogSchema)],
  updateBlog
);

export { router as blogsRouter };
