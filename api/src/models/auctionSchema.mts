import { model, Schema, type InferSchemaType } from "mongoose";
import type { AuctionDTO } from "./auctionDto.mjs";

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

type AuctionDbType = InferSchemaType<typeof auctionSchema>;

export const convertToDto = (dataFromDb: AuctionDbType): AuctionDTO => {
  return {
    id: dataFromDb.id,
    imageUrl: dataFromDb.imageUrl,
    title: dataFromDb.title,
    description: dataFromDb.description,
    endTime: dataFromDb.endTime,
    startingPrice: dataFromDb.startingPrice,
    currentPrice: dataFromDb.currentPrice,
  } satisfies AuctionDTO;
};

export default AuctionModel;
