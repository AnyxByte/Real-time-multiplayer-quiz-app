import jwt from "jsonwebtoken";
import { client } from "./redisHandler.js";

export const handleSocket = (wss) => {
  wss.on("connection", async (socket) => {
    try {
      const token = socket.handshake.auth.token;
      const roomCode = socket.handshake.auth.roomCode;

      if (!token || !roomCode) {
        return new Error("Authentication Error");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decoded.user.id;
      const userName = decoded.user.name;

      const roomDetails = await client.get(roomCode);

      const parsedRoomDetails = JSON.parse(roomDetails);
      console.log(parsedRoomDetails, "roomDetails");

      const isAdmin = userId === parsedRoomDetails.createdBy;

      socket.join(roomCode);

      socket.emit("role", isAdmin ? "admin" : "user");

      if (!isAdmin) {
        wss.to(roomCode).emit("newUserJoined", { userId, userName });
      }

      socket.on("startQuiz", () => {
        if (!isAdmin) {
          socket.emit("error", "You aren't authorized");
          return;
        } else {
          wss.emit("status", "in-progress");
          console.log("starting quiz");
        }
      });

      //broadcast to everyone with message event including sender
      const msg = "hello from backend";
      wss.emit("message", msg);
    } catch (error) {
      console.log(error);
      socket.emit("error", "Authentication Failed");
      socket.disconnect();
    }
  });
};
