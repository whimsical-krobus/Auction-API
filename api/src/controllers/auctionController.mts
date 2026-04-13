import AuctionModel, { convertAuctionToDto } from "../models/auctionSchema.mjs";

export const createAuction = async (
  imageUrl: string,
  title: string,
  description: string,
  endTime: Date,
  startingPrice: number,
  createdBy: string,
) => {
  return await AuctionModel.create({
    imageUrl,
    title,
    description,
    endTime,
    startingPrice,
    currentPrice: startingPrice,
    createdBy,
    leadingBidder: "",
  });
};

export const getAllAuctions = async () => {
  const auctions = await AuctionModel.find();
  return auctions.map(convertAuctionToDto);
};

export const getOneAuction = async (id: string) => {
  const auction = await AuctionModel.findById(id);
  if (!auction) return null;
  return convertAuctionToDto(auction);
};

//export const newAuctionBid = async (auctionId: string, newBid: number) => {
//   return await AuctionModel.findOneAndUpdate(
//     {
//       _id: auctionId,
//       currentPrice: { $lt: newBid },
//     },
//     {
//       $set: { currentPrice: newBid },
//     },
//     { new: true },
//   );
// };

export const deleteAuction = async (id: string) => {
  return await AuctionModel.findByIdAndDelete(id);
};
