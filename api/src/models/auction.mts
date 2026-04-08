export class Auction {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  endTime: Date;
  startingPrice: number;
  currentPrice: number;
  createdBy: string;

  constructor(
    id: string,
    imageUrl: string,
    title: string,
    description: string,
    endTime: Date,
    startingPrice: number,
    currentPrice: number,
    createdBy: string,
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.endTime = endTime;
    this.startingPrice = startingPrice;
    this.currentPrice = currentPrice;
    this.createdBy = createdBy;
  }
}
