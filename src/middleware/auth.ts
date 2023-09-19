import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../lib/types";

export const checkToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({
      success: false,
      error: "Access denied. No token provided",
    });

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Either key is incorrect or token is expired",
    });
  }
};

export const checkUniqueToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const token = req.header("x-auth-token");

  if (token) {
    try {
      const session = jwt.verify(token, "jwtPrivateKey") as JwtPayload;

      const tokenUserId = session.id;

      console.log(tokenUserId, id);

      if (tokenUserId !== id) {
        return res.json({ message: "Token not unique to current user" });
      }
    } catch (error) {
      return res.json({ message: "Invalid token", error });
    }
  } else {
    return res.json({ message: "No token provided" });
  }

  next();
};
