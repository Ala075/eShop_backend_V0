// productController.js
import Product from "../models/Product.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    console.log("Returned All Products Successfully!");
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    console.log("Finded Successfully!");
    res.status(200).json({ success: true, findProduct });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;
  
  if (!name || !description || !price || !imageUrl || !category ) {
    return res.status(400).json({
      success: false,
      error: "Name, Description, Price, imageUrl and Category are required.",
    });
  }
  try {
    const newProduct = new Product({ name, description, price, imageUrl, category });

    await Product.save();

    console.log("Added Successfully!");
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { ...updateData, updatedAt: Date.now() },
      {
        new: false,
      }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    console.log("Updated successfully");
    res.status(200).json({ success: true, updatedProduct });

  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    console.log("Removed Successfully!");
    res.status(200).json({ success: true, Product: deletedProduct });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
};
