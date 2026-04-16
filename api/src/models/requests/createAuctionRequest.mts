export type createAuctionRequest = {
  imageUrl: string;
  title: string;
  description: string;
  endTime: Date;
  startingPrice: number;
  createdBy: string;
};