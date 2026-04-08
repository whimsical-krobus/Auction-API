import express from "express";
import type { RegisterRequest } from "../models/requests/registerRequest.mjs";

export const registerRouter = express.Router();

// POST
registerRouter.post("/", async (req, res) => {
    try {
        const { username, email, password }: RegisterRequest = req.body;
        
        if (!(username && email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});