import express from "express";
import type { RegisterRequest } from "../models/requests/registerRequest.mjs";

export const registerRouter = express.Router();

// GET


// GET id?


// POST
registerRouter.post("/", async (req, res) => {
    try {
        const { username, email, password }: RegisterRequest = req.body;
        
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

// PUT


// DELETE