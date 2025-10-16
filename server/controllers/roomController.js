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

export const getRoom = async (req, res) => {
  try {
    const userId = req.user.user.id;

    if (!userId) {
      return res.status(400).json({
        msg: "Unauthenticated",
      });
    }

    const rooms = await Room.findOne({
      createdBy: userId,
    }).lean();

    return res.status(200).json({
      rooms,
      msg: "rooms",
    });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
    });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(400).json({
        msg: "room not found",
      });
    }

    await Room.findByIdAndDelete(roomId);

    return res.status(200).json({
      msg: "successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
    });
  }
};
