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
import { blogSchema } from "../lib/zodSchemas";

const router = Router();

// get all workouts
router.get("/", [auth], getBlogs);

// get a single workout
router.get("/:id", [auth], getBlog);

// post a new workout
router.post("/", [auth, validateBlog(blogSchema)], createBlog);

// delete a workout
router.delete("/:id", [auth], deleteBlog);

// update a workout
router.patch("/:id", [auth], updateBlog);

export { router as blogsRouter };
