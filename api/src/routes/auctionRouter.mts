import express from "express";
import {
  getAllAuctions,
  createAuction,
} from "../controllers/auctionController.mjs";
import jwt from "jsonwebtoken";
import type { UserDTO } from "../models/userDto.mjs";
import { validateAuctionRequest } from "../utils/validators.mjs";
import e from "express";
import { extractUserFromToken } from "../utils/jwtUtils.mjs";

export const auctionRouter = express.Router();

auctionRouter.get("/", async (_, res) => {
  try {
    const auctions = await getAllAuctions();
    res.status(200).json(auctions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

auctionRouter.post("/", async (req, res) => {
  try {
    const loginCookie = req.cookies.login;

    if (!loginCookie) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    const user = extractUserFromToken(loginCookie);

    if (!user) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    if (!validateAuctionRequest(req.body)) {
      return res.status(400).json({ message: "Missing required fields" });
    }  

    const { imageUrl, title, description, endTime, startingPrice } = req.body;

      const newAuction = await createAuction({
        imageUrl,
        title,
        description,
        endTime,
        startingPrice,
        createdBy: user.username,
      });

      return res.status(201).json(newAuction);
      
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
});
