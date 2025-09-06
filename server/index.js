import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./connectDb.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());

await connectDb();

app.get("/test", (req, res) => {
  return res.json({
    msg: "server running successfully",
  });
});

// user routes
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("server listening to port ", PORT);
});
