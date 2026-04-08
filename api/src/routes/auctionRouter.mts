import express from "express";
import { newAuctionBid  } from "../controllers/auctionController.mjs";
import { createAuction } from "../controllers/auctionController.mjs";

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
        const { imageUrl, title, description, endTime, startingPrice, currentPrice, createdBy } = req.body;

        if ( 
            imageUrl &&
            title && 
            description && 
            endTime && 
            startingPrice && 
            currentPrice && 
            createdBy 
        ) {
            const newAuction = await createAuction(imageUrl, title, description, endTime, startingPrice, currentPrice, createdBy);
            res.status(201).json( newAuction );
        } else {
            res.status(400).json({ message: "Missing required fields" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

// PUT - update auction when someone places a bid
auctionRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { bid } = req.body;
        if (!bid || typeof bid !== "number") {
        return res.status(400).json({ message: "Ogiltigt bud" });
        }
        const updatedAuction = await newAuctionBid(id, bid);

        if (!updatedAuction) {
            return res.status(404).json({ message: "Auction not found" });
        }
        else {
            res.status(200).json({ message: "Auction updated" });
        }
    } catch (error) {
        console.error(error);
            res.status(400).json({ message: "Missing required fields" });
    }
});

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