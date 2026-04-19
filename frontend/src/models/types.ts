export type Auction = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startingPrice: number;
  currentPrice: number;
  endTime: string;
  createdBy: string;
  leadingBidder: string;
};