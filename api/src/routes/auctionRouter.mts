import express from "express";
import type { AuctionDTO } from "../models/auctionDto.mjs";

export const auctionRouter = express.Router();

// GET - all auctions
auctionRouter.get("/", async (_, res) => {
    try {
        res.status(200).json({ message: "All auctions" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error});
   }
});

// GET id - auction if exists
auctionRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({ message: `Auction with ID ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error});
   }
});

// GET title - auction if exists
auctionRouter.get("/:title", async (req, res) => {
    try {
        const { title } = req.params;
        res.status(200).json({ message: `Auction with title ${title}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

// POST - create auction with item, starting price, end time, and sellers user name
auctionRouter.post("/", async (req, res) => {
    try {
        const { title, description, endTime, startingPrice } = req.body;

        if ( title && description && endTime && startingPrice) {
            const newAuction = await createAuction(title, description, endTime, startingPrice);
            res.status(201).json({ message: "Auction created" });
        } else {
            res.status(400).json({ message: "Missing required fields" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

// PUT - update auction when someone places a bid

// DELETE - delete auction after auction has ended
auctionRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({ message: `Auction with ID ${id} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});