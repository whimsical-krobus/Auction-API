export type AuctionDTO = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  endTime: Date;
  startingPrice: number;
  currentPrice: number;
};
