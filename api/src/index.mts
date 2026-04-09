import express, { json } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { registerRouter } from "./routes/registerRouter.mjs"
import { loginRouter } from "./routes/loginRouter.mjs"
import { auctionRouter } from "./routes/auctionRouter.mjs"
import { auth } from "./middleware/auth.mjs";

config();

const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

if (!mongoUrl) {
  throw new Error("Could not find connection string in the env file");
}

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(json());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/auctions", auth, auctionRouter);


app.get("/ping", (_, res) => {
  res.status(200).json({ message: "Alive" });
});


const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});


server.listen(port, async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database error:", error);
  }

  console.log("Server running on port:", port);
});
console.log("MongoURL:", mongoUrl);