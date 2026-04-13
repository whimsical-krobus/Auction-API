import express from "express";
import type { RegisterRequest } from "../models/requests/registerRequest.mjs";
import User from "../models/userSchema.mjs";
import { createUser } from "../controllers/registerController.mjs";


export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
    try {
        const { username, email, password }: RegisterRequest = req.body;
        
        if (!(username && email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userDto = await createUser({ username, email, password });
    
    res.status(200).json(userDto);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});