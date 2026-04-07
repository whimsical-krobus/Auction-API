import AuctionModel, { convertAuctionToDto } from "../models/auctionSchema.mjs";

export const createAuction = async (
  imageUrl: string,
  title: string,
  description: string,
  endTime: Date,
  startingPrice: number,
  currentPrice: number,
  createdBy: string,
) => {
  return await AuctionModel.create({
    imageUrl,
    title,
    description,
    endTime,
    startingPrice,
    currentPrice,
    createdBy
  });
}