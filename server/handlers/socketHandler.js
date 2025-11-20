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

      console.log(parsedRoomDetails.quiz.questions, "questions");

      const questions = parsedRoomDetails.quiz.questions.map((question) => {
        return {
          id: question._id,
          title: question.title,
          options: question.options,
        };
      });

      // console.log(questions, "questions");

      const isAdmin = userId === parsedRoomDetails.createdBy;

      // if (isAdmin) {
      //   await client.setEx(roomCode, 900, socket.id);
      // }

      socket.join(roomCode);

      socket.emit("role", isAdmin ? "admin" : "user");

      if (!isAdmin) {
        socket.to(roomCode).emit("newUserJoined", { userId, userName });
      }

      socket.on("startQuiz", () => {
        if (!isAdmin) {
          socket.emit("error", "You aren't authorized");

          return;
        } else {
          // questions ek saath bhej do ...
          wss.to(roomCode).emit("status", {
            status: "in-progress",
            questions: questions,
          });
          const currTime = Date.now();
          setTimeout(() => {
            socket.to(roomCode).emit("time-up");
          }, 10800);
        }
      });

      socket.on("answer", (data) => {

        // check whether the user has given correct answer or not , if yes assign him points ...





      });
    } catch (error) {
      console.log(error);
      socket.emit("error", "Authentication Failed");
      socket.disconnect();
      console.log("socket disconnected");
    }
  });
};
