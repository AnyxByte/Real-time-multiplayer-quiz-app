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

      const questions = parsedRoomDetails.quiz.questions.map((question) => {
        return {
          id: question._id,
          title: question.title,
          options: question.options,
        };
      });

      const questionsWithAnswers = parsedRoomDetails.quiz.questions;

      const isAdmin = userId === parsedRoomDetails.createdBy;

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

            // user after recieving time-up , can see get their scores
          }, 10800);
        }
      });

      socket.on("answer", async (data) => {
        let scoreOfUser = await client.get(userId);
        scoreOfUser = scoreOfUser ? parseInt(scoreOfUser) : 0;

        const question = questionsWithAnswers.find((q) => q._id === data.id);

        const correctAns =
          question.options[question.ansIndex - 1] === data.option;

        if (correctAns) {
          scoreOfUser = scoreOfUser + 10 + data.duration;
          socket.to(roomCode).emit("updateScore", {
            userName,
            scoreOfUser,
          });
          await client.setEx(userId, 600, String(scoreOfUser));
        } else {
          console.log("false");
        }
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", "Authentication Failed");
      socket.disconnect();
      console.log("socket disconnected");
    }
  });
};
