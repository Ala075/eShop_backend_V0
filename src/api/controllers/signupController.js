// signupController.js
import { config } from "dotenv";
import User from "../models/User.js";
import createToken from "../helpers/createToken.js";

config();
const maxAge = 3 * 24 * 60 * 60 * 1000;

const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "Name , email and password are required.",
    });
  }

  try {
    const newUser = new User({ name, email, password });

    const user = await newUser.save();

    console.log("Added Successfully!");
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error:", error.message);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Email has be taken.",
      });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

export { addUser };
