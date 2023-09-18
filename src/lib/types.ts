import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type TSession = {
  _id: string;
};

export interface ISession extends JwtPayload {
  _id: string;
}

export interface CustomRequest extends Request {
  user?: any;
}
