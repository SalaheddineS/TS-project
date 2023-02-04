import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const Authenticated = async (req: Request, res: Response, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "Token is not provided" });
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(400).json({ message: "Token is not valid" });
    next();
    }

export const NotAuthenticated = async (req: Request, res: Response, next: any) => {
    const token = req.cookies.token;
    if (token) return res.status(400).json({ message: "Token is already provided" });
    next();
    }