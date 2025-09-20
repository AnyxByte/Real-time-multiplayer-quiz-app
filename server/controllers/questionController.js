import Question from "../models/questionModel.js";

export const createQuestion = async (req, res) => {
  try {
    const { title, options, ansIndex } = req.body;

    if (!title || !options || !ansIndex) {
      return res.status(400).json({
        msg: "missing fields",
      });
    }

    const question = await Question.create({
      title,
      options,
      ansIndex,
    });

    res.status(201).json({
      msg: "question created successfully",
      question,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({
      msg: "server error",
    });
  }
};

export const getQuestion = (req, res) => {};

export function deleteQuestion(req, res) {}
