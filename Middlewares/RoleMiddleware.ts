import User from "../src/Models/User";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const AdminVerify = async (req: Request, res: Response, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "Token is not provided" });
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded.id });
  if (user?.isAdmin) {
    next();
  } else {
    return res.json("Not Authorized");
  }
  }catch(err){
    return res.json("Not Authorized");
  
  }
};

export const SellerVerify = async (req: Request, res: Response, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "Token is not provided" });
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    if (user?.isSeller) {
      next();
    } else {
      return res.json("Not Authorized");
    }
  } catch (err) {
    return res.status(400).json({ message: "Token is not valid" });
  }
};

export const UserVerify = async (req: Request, res: Response, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "Token is not provided" });
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(400).json({ message: "Token is not valid" });
  }
};
