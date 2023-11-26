// userController.js
import User from "../models/User.js";

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await User.findById(id);

    if (!findUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("Finded Successfully!");
    res.status(200).json({ success: true, findUser });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    console.log("Returned All Users Successfully!");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

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

    await newUser.save();

    console.log("Added Successfully!");
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error:", error.message);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Email has be taken.",
      });
    }else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { ...updateData, updatedAt: Date.now() },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("Updated successfully");
    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("Removed Successfully!");
    res.status(200).json({ success: true, user: deletedUser });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { getAllUsers, getUserById, addUser, updateUserById, deleteUserById };
