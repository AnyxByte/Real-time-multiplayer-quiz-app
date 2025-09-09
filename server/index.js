import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./connectDb.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

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

await connectDb();

app.get("/test", (req, res) => {
  return res.json({
    msg: "server running successfully",
  });
});

// user routes
app.use("/api/user", userRouter);
// app.use("api/question" , auth ,  questionRouter)

app.listen(PORT, () => {
  console.log("server listening to port ", PORT);
});
