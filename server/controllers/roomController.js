import { Quiz } from "../models/quizModel.js";
import { Room } from "../models/roomModel.js";

export const createRoom = async (req, res) => {
  try {
    const { createdBy, maxPlayers, quiz } = req.body;

    if (!createdBy || !maxPlayers || !quiz) {
      return res.status(400).json({
        msg: "Missing Fields",
      });
    }

    const quizFound = await Quiz.findById(quiz);

    if (!quizFound) {
      return res.status(400).json({
        msg: "Quiz not found",
      });
    }

    if (maxPlayers > 15) {
      return res.status(400).json({
        msg: "maximum players can be no more than 15",
      });
    }

    const roomCode = Math.floor(100000 + Math.random() * 900000);

    const room = await Room.create({
      createdBy,
      maxPlayers,
      quiz,
      roomCode,
    });

    return res.status(201).json({
      msg: "successfully created",
      room,
    });
  } catch (error) {
    console.log(error, "error in createRoom");
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

export const getRoom = (req, res) => {};

export const deleteRoom = (req, res) => {};
