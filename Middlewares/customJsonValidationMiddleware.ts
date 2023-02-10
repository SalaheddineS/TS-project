import { NextFunction, Request, Response } from "express";
import rawBody from "raw-body";

export function CustomJsonValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  rawBody(req, { encoding: true }, (err, body) => {
    if (err) return next(err);
    try {
      req.body = JSON.parse(body.toString());
      next();
    } catch (e) {
      res.status(400).json({ message: "Invalid JSON format" });
    }
  });
}
