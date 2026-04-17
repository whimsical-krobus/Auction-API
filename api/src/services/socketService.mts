import { createServer } from "node:http";
import { Server } from "socket.io";
import type { UserDTO } from "../models/userDto.mjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import AuctionModel from "../models/auctionSchema.mjs";
import { convertAuctionToDto } from "../models/auctionSchema.mjs";
import type { Express } from "express";

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
        socket.emit("bidError", "Du behöver logga in!");
        return;
        }

        const foundAuction = await AuctionModel.findById(auctionId);

        if (foundAuction && loginCookie) {
        const userDto = jwt.decode(loginCookie) as UserDTO;

        if (foundAuction.endTime < new Date()) {
            io.to(auctionId).emit("auctionInfo", convertAuctionToDto(foundAuction));
            socket.emit("bidError", "Auktionen är avslutad!");
            return;
        }
        
        if (foundAuction.createdBy === userDto.username) {
            io.to(auctionId).emit("auctionInfo", convertAuctionToDto(foundAuction));
            socket.emit("bidError", "Du kan inte bjuda på din egen auktion!");
            return;
        } 

        if (bidAmount <= foundAuction.currentPrice) {
            socket.emit("bidError", "Din bud får inte vara lägre än det nuvarande högsta budet!");
            return;
        }

        foundAuction.currentPrice = bidAmount;
        foundAuction.leadingBidder = userDto.username;

        await foundAuction.save();
        } else {
            socket.emit("bidError", "Auktionen kunde inte hittas!");
            return;
        }

        io.to(auctionId).emit("auctionInfo", convertAuctionToDto(foundAuction));
    });
    });

    return server;
}