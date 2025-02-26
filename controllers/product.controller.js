import Product from "../models/product.js";
import Category from "../models/category.js";

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
        const products = await Product.find()
            .select("id name price stock minimumStock status")
            .populate("category", "name");

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .select("id name price stock minimumStock status")
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

// Create a new product
export const postProduct = async (req, res) => {
    try {
        const { name, category, price, stock, minimumStock, status } = req.body;

        if (!name || !category || !price || stock === undefined || minimumStock === undefined || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingCategory = await Category.findOne({ name: category });
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        const id = await generateProductId();
        const newProduct = new Product({
            id,
            name,
            category: existingCategory._id,
            price,
            stock,
            minimumStock,
            status
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, stock, minimumStock, status } = req.body;

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
            { name, category: categoryId, price, stock, minimumStock, status},
            { new: true }
        )
            .select("id name price stock minimumStock")
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
        const { id } = req.params;
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