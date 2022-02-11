// import "reflect-metadata";
import { config } from "dotenv";
import http from "http";
import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import { SocketInit } from "./socket.io";
import { downloadsRouter } from "./routes/downloads.routes";

config();

const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

new SocketInit(io);

let db: any = process.env.MONGO_DB;

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    throw error;
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(downloadsRouter)


app.get("/", (req: Request, res: Response) => {
  res.status(200).send('ok');
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})