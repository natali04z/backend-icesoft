import Product from "../models/product.js"; 
import Category from "../models/category.js"; 

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category", "name"); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("category", "name");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Create a new product
export const postProduct = async (req, res) => {
    try {
        const { name, category, price, stock, minimumStock } = req.body;

        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        const newProduct = new Product({ name, category, price, stock, minimumStock });
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, stock, minimumStock } = req.body;

        if (category) {
            const existingCategory = await Category.findById(category);
            if (!existingCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, category, price, stock, minimumStock },
            { new: true }
        ).populate("category", "name");

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
