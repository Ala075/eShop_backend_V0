import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import categoryRouter from "./src/api/routes/category.js";
import productRouter from "./src/api/routes/product.js";
import userRouter from "./src/api/routes/user.js";
import Connect_DB from "./src/config/db.js";

const app = express();
app.use(helmet());
const port = 3001;

//DataBase connexion
Connect_DB();

//Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//User Router
app.use("/Users",userRouter);
//Category Router
app.use("/Categories",categoryRouter);
//product Router
app.use("/Products",productRouter);

//Start Server on a specific port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
