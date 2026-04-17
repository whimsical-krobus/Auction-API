import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import UserModel from "../models/userSchema.mjs";
import { extractUserFromToken } from "../utils/jwtUtils.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["login"];

    if (!token) {
      res.status(401).json({ message: "You are not logged in" });
    } else {
      const user = extractUserFromToken(token);

      if (!user) {
        res.status(401).json({ message: "You are not logged in" });
      } else {
        const foundUser = await UserModel.findOne({
          email: user.email,
        });

        if (foundUser) {
          next();
        } else {
          res.status(403).json({ message: "Impersonating an user are we?" });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "You are not logged in" });
  }
};
