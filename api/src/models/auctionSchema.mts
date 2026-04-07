import {
  model,
  Schema,
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";
import type { AuctionDTO } from "./auctionDto.mjs";

const auctionSchema = new Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  endTime: { type: Date, required: true },
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
});

const AuctionModel = model("auction", auctionSchema);

type AuctionDbType = InferSchemaType<typeof auctionSchema>;

type AuctionDocument = HydratedDocument<AuctionDbType>;

export const convertToDto = (dataFromDb: AuctionDocument): AuctionDTO => {
  return {
    id: dataFromDb._id.toString(),
    imageUrl: dataFromDb.imageUrl,
    title: dataFromDb.title,
    description: dataFromDb.description,
    endTime: dataFromDb.endTime,
    startingPrice: dataFromDb.startingPrice,
    currentPrice: dataFromDb.currentPrice,
  } satisfies AuctionDTO;
};

export default AuctionModel;
