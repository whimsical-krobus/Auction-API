import { createServer } from "node:http";
import { Server } from "socket.io";
import cookie from "cookie";
import AuctionModel from "../models/auctionSchema.mjs";
import { convertAuctionToDto } from "../models/auctionSchema.mjs";
import type { Express } from "express";
import { SOCKET_MESSAGES } from "../constants/messages.mjs";
import { extractUserFromToken } from "../utils/jwtUtils.mjs";

const allowedOrigins = ["http://localhost:5173"];

export function initializeSocket(app: Express) {
    const server = createServer(app);

    const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
    });

    io.on("connection", async (socket) => {
    
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const loginCookie = cookies.login;
    
    socket.on("joinAuction", async (auctionId: string) => {
    
        if (!loginCookie) {
        socket.emit("bidError", SOCKET_MESSAGES.NOT_LOGGED_IN);
        return;
        }
        
        socket.join(auctionId);
    
        const foundAuction = await AuctionModel.findById(auctionId);

        if (foundAuction) {
        socket.emit("auctionInfo", convertAuctionToDto(foundAuction));
        }
    });

    socket.on("placeBid", async (bidAmount: number, auctionId: string) => {
        if (!loginCookie) {
        socket.emit("bidError", SOCKET_MESSAGES.NOT_LOGGED_IN);
        return;
        }

        const foundAuction = await AuctionModel.findById(auctionId);

        if (foundAuction && loginCookie) {
        const userDto = extractUserFromToken(loginCookie);

        if (!userDto) {
            socket.emit("bidError", SOCKET_MESSAGES.NOT_LOGGED_IN);
            return;
        }

        if (foundAuction.endTime < new Date()) {
            io.to(auctionId).emit("auctionInfo", convertAuctionToDto(foundAuction));
            socket.emit("bidError", SOCKET_MESSAGES.AUCTION_ENDED);
            return;
        }
        
        if (foundAuction.createdBy === userDto.username) {
            io.to(auctionId).emit("auctionInfo", convertAuctionToDto(foundAuction));
            socket.emit("bidError", SOCKET_MESSAGES.OWN_AUCTION);
            return;
        } 

        if (bidAmount <= foundAuction.currentPrice) {
            socket.emit("bidError", SOCKET_MESSAGES.BID_TOO_LOW);
            return;
        }

        foundAuction.currentPrice = bidAmount;
        foundAuction.leadingBidder = userDto.username;

        await foundAuction.save();
        } else {
            socket.emit("bidError", SOCKET_MESSAGES.AUCTION_NOT_FOUND);
            return;
        }

        io.to(auctionId).emit("auctionInfo", convertAuctionToDto(foundAuction));
    });
    });

    return server;
}