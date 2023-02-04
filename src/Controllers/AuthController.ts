import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../Models/User";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const current = req.body;
  if (!current.email || !current.password)
    return res.status(400).json({ message: "Email and password are required" });
  const currentUserInDB = await User.findOne({ email: current.email });
  if (!currentUserInDB)
    return res.status(400).json({ message: "Email or password are incorrect" });
  const isPasswordCorrect = await bcrypt.compare(
    current.password,
    currentUserInDB.password
  );
  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Email or password are incorrect" });
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  const token = jwt.sign({ id: currentUserInDB._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true });
  res.json("Successfully logged in");
};


export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json("Successfully logged out");
  res.end();
};
