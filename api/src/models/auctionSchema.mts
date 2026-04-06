import { model, Schema } from "mongoose";

const auctionSchema = new Schema({
  id: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  endTime: { type: Date, required: true },
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
});

const AuctionModel = model("auction", auctionSchema);
