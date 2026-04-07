import express from "express";
//import { AuctionDTO } from "../models/auctionDto.mjs";

export const auctionRouter = express.Router();

// GET - all auctions
auctionRouter.get("/", (_, res) => {
    try {
        res.status(200).json({ message: "All auctions" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error});
   }
});

// GET id - auction if exists


// GET title - auction if exists
auctionRouter.get("/:title", (req, res) => {
    try {
        const { title } = req.params;
        res.status(200).json({ message: `Auction with title ${title}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

// POST - create auction with item, starting price, end time, and seller id



// PUT - update auction when someone places a bid

// DELETE - delete auction after auction has ended