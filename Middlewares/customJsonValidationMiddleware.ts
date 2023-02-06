import { Request, Response } from "express";

export function CustomjsonValidationMiddleware(req: Request, res: Response, next: any) {
    try {
      JSON.parse(req.body.toString());
      next();
    } catch (e) {
      res.status(400).json({ message: "Invalid JSON format" });
    }
  }

