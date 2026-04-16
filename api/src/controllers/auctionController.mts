import AuctionModel, { convertAuctionToDto } from "../models/auctionSchema.mjs";
import type { createAuctionRequest } from "../models/requests/createAuctionRequest.mjs";

export const createAuction = async (data: createAuctionRequest) => {
  return await AuctionModel.create({
   ...data,
    currentPrice: data.startingPrice,
    leadingBidder: "",
  });
};

export const getAllAuctions = async () => {
  const auctions = await AuctionModel.find();
  return auctions.map(convertAuctionToDto);
};