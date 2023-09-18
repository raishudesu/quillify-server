import { Router } from "express";
import {
  getUser,
  login,
  logoutUser,
  register,
  updateUserProfile,
  updateUserPwd,
} from "../controllers/userController";
import validateSchema from "../middleware/validateSchema";
import {
  userLoginSchema,
  userProfileUpdateSchema,
  userPwdUpdateSchema,
  userRegistrationSchema,
} from "../lib/zodSchemas";
import { checkToken, checkUniqueToken } from "../middleware/auth";

const router = Router();

// sign up a user
router.post("/register", validateSchema(userRegistrationSchema), register);

// sign in a user
router.post("/login", validateSchema(userLoginSchema), login);

//update user profile
router.patch(
  "/updateUserProfile/:id",
  [checkToken, checkUniqueToken, validateSchema(userProfileUpdateSchema)],
  updateUserProfile
);

// update user password
router.patch(
  "/updateUserPwd/:id",
  [checkToken, checkUniqueToken, validateSchema(userPwdUpdateSchema)],
  updateUserPwd
);

//get user session
router.get("/getUser", getUser);

//log out user
router.post("/logout", logoutUser);

export { router as userRouter };
