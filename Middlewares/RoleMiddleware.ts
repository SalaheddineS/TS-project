import User from "../src/Models/User";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { RequestWithUser } from "../Overriden_Interfaces/RequestWithUser";
export const AdminVerify = async (req: RequestWithUser, res: Response, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "Token is not provided" });
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (user?.isAdmin) {
      req.user = user;
      next();
    } else {
      return res.json("Not Authorized");
    }
  } catch (err) {
    return res.json("Not Authorized");
  }
};

export const SellerVerify = async (req: RequestWithUser, res: Response, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "Token is not provided" });
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (user?.isSeller) {
      req.user = user;
      next();
    } else {
      return res.json("Not Authorized");
    }
  } catch (err) {
    return res.status(400).json({ message: "Token is not valid" });
  }
};

export const UserVerify = async (req: RequestWithUser, res: Response, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "Token is not provided" });
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (user?.isAdmin || user?.isSeller) {
      return res.json("Not Authorized");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Token is not valid" });
  }
};
