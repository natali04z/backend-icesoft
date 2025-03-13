import Product from "../models/product.js";
import Category from "../models/category.js";
import mongoose from "mongoose";
import { checkPermission } from "../utils/permissions.js";

async function generateProductId() {
    const lastProduct = await Product.findOne().sort({ _id: -1 });

    if (!lastProduct || !/^Pr\d{2}$/.test(lastProduct.id)) {
        return "Pr01";
    }

    const lastNumber = parseInt(lastProduct.id.substring(2), 10);
    const nextNumber = (lastNumber + 1).toString().padStart(2, "0");
    return `Pr${nextNumber}`;
}

// Get all products
export const getProducts = async (req, res) => {
    try {
        if (!checkPermission(req.user.role, "view_products")) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const products = await Product.find()
            .select("id name price stock minimumStock status category") // ← incluimos 'category'
            .populate("category", "name"); // ← trae solo el nombre de la categoría

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        if (!checkPermission(req.user.role, "view_products")) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Product.findById(id)
            .select("id name price stock minimumStock status category") // ← también incluimos 'category'
            .populate("category", "name");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// POST: Create new purchase
export const postPurchase = async (req, res) => {
    try {
        const { product, provider, total, details } = req.body;

        if (!product || !provider || total === undefined || !details) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(product)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(provider)) {
            return res.status(400).json({ message: "Invalid provider ID" });
        }

        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingProvider = await Provider.findById(provider);
        if (!existingProvider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        const id = await generatePurchaseId();
        const newPurchase = new Purchase({
            id,
            product,
            provider,
            total,
            details
        });

        await newPurchase.save();
        res.status(201).json({ message: "Purchase created successfully", purchase: newPurchase });
    } catch (error) {
        console.error("Error creating purchase:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        if (!checkPermission(req.user.role, "update_products")) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { id } = req.params;
        const { name, category, price, stock, minimumStock, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        let categoryId = null;
        if (category) {
            const existingCategory = await Category.findOne({ name: category });
            if (!existingCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            categoryId = existingCategory._id;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, category: categoryId, price, stock, minimumStock, status },
            { new: true, runValidators: true }
        )
            .select("id name price stock minimumStock status")
            .populate("category", "name");

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        if (!checkPermission(req.user.role, "delete_products")) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error" });
    }
};