import AuctionModel, { convertAuctionToDto } from "../models/auctionSchema.mjs";

export const createAuction = async (req, res) => {
  try {
    const auction = new AuctionModel({
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      description: req.body.description,
      endTime: req.body.endTime,
      startingPrice: req.body.startingPrice,
      currentPrice: req.body.startingPrice,
      createdBy: req.user.email,
    });

    await auction.save();

    res.status(200).json(convertAuctionToDto(auction));
  } catch (error) {
    res.status(500).json(error);
  }
};ß