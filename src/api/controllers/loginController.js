// loginController.js
import User from "../models/User.js";

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const findUser = await User.login(email,password);
  
      if (!findUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
  
      console.log("Finded Successfully!");
      res.status(200).json({ success: true, user: findUser._id });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  };

  export { loginUser };