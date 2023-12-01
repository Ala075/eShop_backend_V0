// userRoutes.js

import express from "express";
import * as userController from "../controllers/userController.js";
import { authAdmin } from "../middlewares/authRes.js";

const userRouter = express.Router();


userRouter.get("/",authAdmin, userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);

export default userRouter;

