import express from "express";
import {
  addCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", addCategory);
categoryRouter.patch("/:id", updateCategoryById);
categoryRouter.delete("/:id", deleteCategoryById);

export default categoryRouter;
