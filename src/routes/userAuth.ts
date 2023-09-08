import { Router } from "express";
import {
  getUser,
  login,
  logoutUser,
  register,
  updateUserPwd,
} from "../controllers/userController";
import {
  validateUserLogin,
  validateUserRegistration,
} from "../middleware/validateUser";
import { userLoginSchema, userRegistrationSchema } from "../lib/zodSchemas";

const router = Router();

// sign up a user
router.post(
  "/register",
  validateUserRegistration(userRegistrationSchema),
  register
);

// sign in a user
router.post("/login", validateUserLogin(userLoginSchema), login);

// update user password
router.patch("/update_pwd/:id", updateUserPwd);

//get user session
router.get("/getUser", getUser);

//log out user
router.post("/logout", logoutUser);

export { router as userRouter };
