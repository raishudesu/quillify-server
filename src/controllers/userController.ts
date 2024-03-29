import UserModel from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUsername = await UserModel.findOne({ username });
    const existingEmail = await UserModel.findOne({ email });

    if (existingUsername)
      return res.json({ success: false, message: "Username already exists" });

    if (existingEmail)
      return res.json({ success: false, message: "Email already exists" });

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPwd,
    });

    res.json({
      success: true,
      message: "User registered successfully",
      userDetails: newUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });

    const isPwdValid = await bcrypt.compare(password, user.password);
    console.log(isPwdValid);

    if (!isPwdValid)
      return res.status(400).json({
        success: false,
        message: "Username or password is incorrect",
      });

    const token = jwt.sign(
      {
        success: true,
        id: user._id,
        email,
        username: user.username,
        createdAt: user.createdAt,
      },
      "jwtPrivateKey",
      {
        expiresIn: "15m",
      }
    ); // ADD {expiresIn: "15m"} for adding token expiration

    res
      .cookie("token", token) // set a cookie for user session
      .json({
        success: true,
        token,
        userId: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await UserModel.findOne({ _id: id });

    if (!user)
      return res.json({ success: false, message: "User doesn't exist" });

    const isPwdValid = await bcrypt.compare(password, user.password);

    if (!isPwdValid)
      return res.json({
        success: false,
        message: "Password provided is incorrect",
      });

    const updateUser = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        username,
        email,
      }
    );

    res.json({
      success: true,
      message: "User profile updated",
      updatedCredentials: { username, email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUserPwd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, newPwd, confirmNewPwd } = req.body;

    const user = await UserModel.findOne({ _id: id });

    if (!user)
      return res.json({ success: false, message: "User doesn't exist" });

    const isPwdValid = await bcrypt.compare(password, user.password);

    if (!isPwdValid)
      return res.json({
        success: false,
        message: "Password provided is incorrect",
      });

    if (newPwd !== confirmNewPwd)
      return res.json({ success: false, message: "Passwords do not match" });

    const hashedPwd = await bcrypt.hash(newPwd, 10);

    const updatePwd = await UserModel.findOneAndUpdate(
      { _id: id },
      { password: hashedPwd }
    );

    res.json({ success: true, message: "Password updated" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUser = (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    token
      ? jwt.verify(token, "jwtPrivateKey", {}, (err, info) => {
          if (err) return res.json(err);
          const session = { ...(info as object), token };
          console.log(session);
          res.json(session);
        })
      : null;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.cookie("token", "").json({ success: true, message: "User logged out" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
