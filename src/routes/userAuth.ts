import { Router } from "express";
import {
  getUser,
  login,
  logoutUser,
  register,
  updateUserPwd,
} from "../controllers/userController";
import validateUser from "../middleware/validateUser";
import { userSchema } from "../lib/zodSchemas";

const router = Router();

// sign up a user
router.post("/register", validateUser(userSchema), register);

// sign in a user
router.post("/login", login);

// update user password
router.patch("/update_pwd/:id", updateUserPwd);

//get user session
router.get("/getUser", getUser);

//log out user
router.post("/logout", logoutUser);

export { router as userRouter };
