import express from "express";

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

// POST - create auction with item, starting price, end time, and seller id

// PUT - update auction when someone places a bid

// DELETE - delete auction after auction has ended
