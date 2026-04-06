
// GET - all auctions

// GET id - auction if exists

// POST - create auction with item, starting price, end time, and seller id

// PUT - update auction when someone places a bid

// DELETE - delete auction after auction has endedimport express from "express";

export const auctionRouter = express.Router();