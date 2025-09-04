import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const handleRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "Missing fields",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        msg: "user exists already",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      msg: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("error in create user");

    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleLogin = async (req, res) => {};

export const handleUpdate = async (req, res) => {};

export const handleDelete = async (req, res) => {};
