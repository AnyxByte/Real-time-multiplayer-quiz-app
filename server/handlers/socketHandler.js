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

      console.log(roomCode, "roomCode");

      const roomDetails = await client.get(roomCode);

      const parsedRoomDetails = JSON.parse(roomDetails);
      console.log(parsedRoomDetails, "roomDetails");

      if (userId === parsedRoomDetails.createdBy) {
        socket.emit("role", "admin");
      } else {
        socket.emit("role", "user");
      }

      //broadcast to everyone with message event including sender
      const msg = "hello from backend";
      wss.emit("message", msg);
    } catch (error) {
      console.log(error);
      socket.emit("error","Authentication Failed");
      socket.disconnect();
    }
  });
};
