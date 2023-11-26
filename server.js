import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import User from "./models/User.js";

const app = express();
const db_url = "mongodb+srv://Alaarfaoui:QBUuWuVLar9nyOCi@cluster0.jqcd76q.mongodb.net/test?retryWrites=true&w=majority";

app.use(helmet());


const Cnx_DB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Connecting to the database => ", error.message);
  }
};
Cnx_DB();

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render(index.ejs,{
    user:"Ala Arfaoui",
  });
});

app.get("/Users/:id", async (req, res) => {
  const { id } = req.params;
  try {
      const findUser = await User.findById(id);

      if (!findUser) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      console.log("Finded Successfully!");
      res.status(200).json({ success: true, user: findUser });
  } catch (error) {
      console.error("Error3:", error.message);
      res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/Users", async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
        return res.status(404).json({ success: false, message: "No users found" });
    }

    console.log("Returned All Users Successfully!");
    res.status(200).json({ success: true, users });
  } catch (error) {
      console.error("Error2:", error.message);
      res.status(500).json({ success: false, error: error.message });
  }
});


app.post("/Users", async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
      return res.status(400).json({ success: false, error: "Username and password are required." });
  }

  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 11);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      console.log("Added Successfully!");
      res.status(200).json({ success: true });
  } catch (error) {
      console.error("Error1:", error.message);
      res.status(500).json({ success: false, error: error.message });
  }
});


app.delete("/Users/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      console.log("Removed Successfully!");
      res.status(200).json({ success: true, user: deletedUser });
  } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, error: error.message });
  }
});

export default app ;
/*-----------------------*/
/*import app from "./server";

const port = process.env.PORT || 3001;

const startServer=()=>{
  try {
    app.listen(port, () => {
      console.log(`app listening on port ${port}!`);
    });
  } catch (error) {
    
  }
}

startServer();*/