import Category from "../models/category.js";

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
        const category = await Category.findOne({ id: req.params.id });

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
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: req.params.id }, // Cambia "id" por "_id"
            req.body,
            { new: true, runValidators: true } // Agrega "runValidators" para validar los datos
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Error updating category", error });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndDelete({ _id: req.params.id });

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Error deleting category" });
    }
};