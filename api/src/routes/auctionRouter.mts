import express from "express";
import {
  getAllAuctions,
  createAuction,
} from "../controllers/auctionController.mjs";
import jwt from "jsonwebtoken";
import type { UserDTO } from "../models/userDto.mjs";

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

    const user = jwt.verify(
      loginCookie,
      process.env.JWT_SECRET || "banankontakt",
    ) as UserDTO;

    const { imageUrl, title, description, endTime, startingPrice } = req.body;

    if (
      typeof imageUrl === "string" &&
      typeof title === "string" &&
      typeof description === "string" &&
      endTime &&
      typeof startingPrice === "number"
    ) {
      const newAuction = await createAuction(
        imageUrl,
        title,
        description,
        endTime,
        startingPrice,
        user.username,
      );

      return res.status(201).json(newAuction);

    } else {
      return res.status(400).json({ message: "Missing required fields" });
    }
  } catch (error) {
       return res.status(500).json({ message: "Internal server error" });
  }
});
