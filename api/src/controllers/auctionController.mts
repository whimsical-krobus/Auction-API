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
    createdBy,
  });
};

export const getAuctions = async () => {
  return await AuctionModel.find();
};

export const getAuction = async (id: string) => {
  return await AuctionModel.findOne({ id: +id });
};

export const newAuctionBid = async (auctionId: string, newBid: number) => {
  return await AuctionModel.findOneAndUpdate(
    {
      _id: auctionId,
      currentPrice: { $lt: newBid },
    },
    {
      $set: { currentPrice: newBid },
    },
    { new: true },
  );
};

export const deleteAuction = async (id: string) => {
  return await AuctionModel.findOneAndDelete({ id: +id });
};
