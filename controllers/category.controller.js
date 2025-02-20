import Category from '../models/category.js'

// Get all categories
export async function getCategories(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
}

// Get category by ID
export async function getOneCategory(req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category' });
    }
}

// Create a new category
export async function postCategory(req, res) {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category' });
    }
}

// Update a category
export async function putCategory(req, res) {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error updating category' });
    }
}

// Delete a category
export async function deleteCategory(req, res) {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category' });
    }
}