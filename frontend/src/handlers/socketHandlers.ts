import { socket } from "../services/socket";
import type { Auction } from "../models/types";
import { showAuction } from "../ui/auctionUI";
import { showBidError } from "../ui/messageUI";

export function setupSocketHandlers() {
    socket.on("connect", () => {
        socket.on("auctionInfo", (auction: Auction) => {
            showAuction(auction);
        });

        socket.on("bidError", (message: string) => {
            showBidError(message);
        });
    });
}