import { JwtPayload } from "jsonwebtoken";

export type TSession = {
  _id: string;
};

export interface ISession extends JwtPayload {
  _id: string;
}
