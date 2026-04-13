import express from "express";
import {
  getAllAuctions,
  getOneAuction,
} from "../controllers/auctionController.mjs";
import { createAuction } from "../controllers/auctionController.mjs";

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

auctionRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await getOneAuction(id);
    if (!auction) {
      res.status(404).json({ message: `Auction with ID ${id} not found` });
    } else {
      res.status(200).json(auction);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

auctionRouter.post("/", async (req, res) => {
  try {
    const { imageUrl, title, description, endTime, startingPrice, createdBy } =
      req.body;

    if (
      typeof imageUrl === "string" &&
      typeof title === "string" &&
      typeof description === "string" &&
      endTime &&
      typeof startingPrice === "number" &&
<<<<<<< HEAD
      typeof createdBy === "string"
=======
      typeof createdBy === "string" 
>>>>>>> 0c45af36ba5b51e861e7202dd6c5da5261a00818
    ) {
      const newAuction = await createAuction(
        imageUrl,
        title,
        description,
        endTime,
        startingPrice,
        createdBy,
      );
      res.status(201).json(newAuction);
    } else {
      res.status(400).json({ message: "Missing required fields" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});
