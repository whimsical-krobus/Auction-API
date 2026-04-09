import express from "express";
import type { LoginRequest } from "../models/requests/loginRequest.mjs";
import { loginUser } from "../controllers/loginController.mjs";
import jwt from "jsonwebtoken";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password }: LoginRequest = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "No login credentials send" });
    }

    const userDto = await loginUser({ email, password });

    if (userDto) {
      const token = jwt.sign(userDto, process.env.JWT_SECRET || "banankontakt");

      const expires = new Date();
      expires.setHours(expires.getHours() + 1);

      res.cookie("login", token, {
        expires,
        httpOnly: false,
      });

      return res.status(200).json(userDto);
    }

    res.status(400).json({ message: "Unable to log in" });
  } catch (error) {
    console.error(error);
    res.status(500).json(JSON.stringify(error));
  }
});

// loginRouter.get("/me", (req, res) => {
//   try {
//     const token = req.cookies["login"];

//     if (!token) {
//       return res.status(401).send("You are not logged in");
//     }

//     const user = jwt.decode(token) as UserDto | null;

//     if (!user) {
//       return res.status(401).send("You are not logged in");
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(401).send("You are not logged in");
//   }
// });
