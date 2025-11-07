import jwt from "jsonwebtoken";
import { client } from "./redisHandler.js";

export const handleSocket = (wss) => {
  wss.on("connection", async (socket) => {
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
      console.log("admin");
      // emit admin event and render different page and if normal user , emit different things and render different page
    }

    //broadcast to everyone with message event including sender
    const msg = "hello from backend";
    wss.emit("message", msg);

    // console.log(socket, "socket");
  });

  // socket.userId == room.createdBy
  // if yes then listen for start event and if the user starts the quiz
  //    calculate everyone score and tell which user is 1st and which is 2nd and which is 3rd , show the complete leaderboard ( run a timer )
  // after time'sup , send a message as timeup  , then send the final score ....
  //   admin displays the final score
  //
};
