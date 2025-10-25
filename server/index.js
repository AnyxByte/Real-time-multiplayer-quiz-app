import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { connectDb } from "./connectDb.js";
import userRouter from "./routes/userRoute.js";
import questionRouter from "./routes/questionRoute.js";
import quizRouter from "./routes/quizRoute.js";
import aiRouter from "./routes/aiRoute.js";
import roomRouter from "./routes/roomRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { auth } from "./middleware/auth.js";
import { handleSocket } from "./handlers/socketHandler.js";
import { client } from "./handlers/redisHandler.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

await connectDb();

app.get("/test", (req, res) => {
  return res.json({
    msg: "server running successfully",
  });
});

// user routes
app.use("/api/user", userRouter);
app.use("/api/question", auth, questionRouter);
app.use("/api/talkToAI", auth, aiRouter);
app.use("/api/quiz", auth, quizRouter);
app.use("/api/room", auth, roomRouter);

// http server
const httpserver = app.listen(PORT, () => {
  console.log("server listening to port ", PORT);
});

// redis server
client.on("error", (error) => console.log("redis client error", error));

await client.connect();

// websocket server

const wss = new Server(httpserver, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

handleSocket(wss);
