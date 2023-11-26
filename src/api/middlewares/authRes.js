import User from "../models/User.js";

const authAdmin = async (req, res, next) => {
  const userId = req.body.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userRole = user.role;
    if (userRole === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const authManager = async (req, res, next) => {
  const userId = req.body.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userRole = user.role;
    if (userRole === "manager") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { authAdmin, authManager };
