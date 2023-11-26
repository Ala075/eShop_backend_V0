// productRouter.js
import express from "express";
import * as productController from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', productController.addProduct);
productRouter.patch('/:id', productController.updateProductById);
productRouter.delete('/:id', productController.deleteProductById);

export default productRouter;