// logoutRoutes.js

import express from "express";
import goHome from "../controllers/logoutController.js";

const logoutRouter = express.Router();

logoutRouter.get("/",goHome);
logoutRouter.post("/",goHome);

export default logoutRouter;


