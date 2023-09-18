import UserModel from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ISession, TSession } from "../lib/types";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUsername = await UserModel.findOne({ username });
    const existingEmail = await UserModel.findOne({ email });

    if (existingUsername)
      return res.json({ message: "Username already exists" });

    if (existingEmail) return res.json({ message: "Email already exists" });

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPwd,
    });

    res.json({ message: "User registered successfully", userDetails: newUser });
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
      return res.json({ success: false, message: "User doesn't exist" });

    const isPwdValid = await bcrypt.compare(password, user.password);

    if (!isPwdValid)
      return res.json({
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

    const { token } = req.cookies;

    const user = await UserModel.findOne({ _id: id });

    if (!user) return res.json({ message: "User doesn't exist" });

    // CHECK IF TOKEN IS UNIQUE TO THE USER

    if (token) {
      try {
        const session = jwt.verify(token, "jwtPrivateKey") as JwtPayload;
        console.log(session);
        const tokenUserId = session.id;

        if (tokenUserId !== id) {
          console.log(tokenUserId, id);
          return res.json({ message: "Token not unique to current user" });
        }
      } catch (error) {
        return res.json({ message: "Invalid token", error });
      }
    } else {
      return res.json({ message: "No token provided" });
    }

    const isPwdValid = await bcrypt.compare(password, user.password);

    if (!isPwdValid)
      return res.json({ message: "Password provided is incorrect" });

    const updateUser = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        username,
        email,
      }
    );

    res.json({ message: "User profile updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUserPwd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, newPwd } = req.body;

    const user = await UserModel.findOne({ _id: id });

    if (!user) return res.json({ message: "User doesn't exist" });

    const isPwdValid = await bcrypt.compare(password, user.password);

    if (!isPwdValid)
      return res.json({ message: "Password provided is incorrect" });

    const hashedPwd = await bcrypt.hash(newPwd, 10);

    const updatePwd = await UserModel.findOneAndUpdate(
      { _id: id },
      { password: hashedPwd }
    );

    res.json({ message: "Password updated", updatePwd });
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
          if (err) throw err;
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
    res.cookie("token", "").json({ message: "User logged out" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
