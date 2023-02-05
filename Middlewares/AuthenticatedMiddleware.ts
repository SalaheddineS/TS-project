import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const Authenticated = async (req: Request, res: Response, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "Token is not provided" });
    next();
    }

export const NotAuthenticated = async (req: Request, res: Response, next: any) => {
    const token = req.cookies.token;
    if (token) return res.status(400).json({ message: "Token is already provided" });
    next();
    }