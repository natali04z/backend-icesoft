import Category from "../models/category.js";
import mongoose from "mongoose";

async function generateCategoryId() {
    const lastCategory = await Category.findOne().sort({ id: -1 });

    if (!lastCategory || !/^Ca\d{2}$/.test(lastCategory.id)) {
        return "Ca01";
    }

    const lastNumber = parseInt(lastCategory.id.substring(2), 10);
    const nextNumber = (lastNumber + 1).toString().padStart(2, "0");
    return `Ca${nextNumber}`;
}

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Error fetching categories" });
    }
};

// Get category by ID
export const getOneCategory = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: "Error fetching category" });
    }
};

// Create a new category
export const postCategory = async (req, res) => {
    try {
        const { name, description, status } = req.body;

        if (!name || !description || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (name.length < 3 || name.length > 50) {
            return res.status(400).json({ message: "Category name must be between 3 and 50 characters" });
        }

        if (description.length < 5 || description.length > 200) {
            return res.status(400).json({ message: "Description must be between 5 and 200 characters" });
        }

        if (!["active", "inactive"].includes(status)) {
            return res.status(400).json({ message: "Status must be 'active' or 'inactive'" });
        }

        const id = await generateCategoryId();
        const newCategory = new Category({ id, name, description, status });

        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", id: newCategory.id, ...newCategory._doc });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Error creating category" });
    }
};

// Update a category
export const putCategory = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const { name, description, status } = req.body;

        if (name && (name.length < 3 || name.length > 50)) {
            return res.status(400).json({ message: "Category name must be between 3 and 50 characters" });
        }

        if (description && (description.length < 5 || description.length > 200)) {
            return res.status(400).json({ message: "Description must be between 5 and 200 characters" });
        }

        if (status && !["active", "inactive"].includes(status)) {
            return res.status(400).json({ message: "Status must be 'active' or 'inactive'" });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Error updating category" });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Error deleting category" });
    }
};
