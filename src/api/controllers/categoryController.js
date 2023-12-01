// categoryController.js
import Category from "../models/Category.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found" });
    }

    console.log("Returned All Categories Successfully!");
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const findCategory = await Category.findById(id);

    if (!findCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    console.log("Finded Successfully!");
    res.status(200).json({ success: true, findCategory });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const addCategory = async (req, res) => {
  const { name, description, imageUrl } = req.body;
  
  if (!name || !description || !imageUrl ) {
    return res.status(400).json({
      success: false,
      error: "Name, Description and imageUrl are required.",
    });
  }
  try {
    const newCategory = new Category({ name, description, imageUrl });

    await Category.save();

    console.log("Added Successfully!");
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id },
      { ...updateData, updatedAt: Date.now() },
      {
        new: false,
      }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    console.log("Updated successfully");
    res.status(200).json({ success: true, updatedCategory });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    console.log("Removed Successfully!");
    res.status(200).json({ success: true, Category: deletedCategory });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  addCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
};
