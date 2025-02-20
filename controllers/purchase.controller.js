import Purchase from "../models/purchase.js";
import Product from "../models/product.js";
import Provider from "../models/provider.js";

// GET: Retrieve all purchases with product and provider details
export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find()
            .populate("product", "name price") // Get product name and price
            .populate("provider", "name contact_number"); // Get provider name and contact number

        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET: Retrieve a single purchase by ID
export const getPurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase.findById(id)
            .populate("product", "name price")
            .populate("provider", "name contact_number");

        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        res.status(200).json(purchase);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST: Create a new purchase
export const postPurchase = async (req, res) => {
    try {
        const { product, provider, total, details } = req.body;

        // Validate if the product and provider exist
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingProvider = await Provider.findById(provider);
        if (!existingProvider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        // Create the purchase
        const newPurchase = new Purchase({ product, provider, total, details });
        await newPurchase.save();

        res.status(201).json({ message: "Purchase created successfully", purchase: newPurchase });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT: Update an existing purchase
export const updatePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const { product, provider, total, details } = req.body;

        // Validate if the product and provider exist
        if (product) {
            const existingProduct = await Product.findById(product);
            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
        }

        if (provider) {
            const existingProvider = await Provider.findById(provider);
            if (!existingProvider) {
                return res.status(404).json({ message: "Provider not found" });
            }
        }

        // Update the purchase
        const updatedPurchase = await Purchase.findByIdAndUpdate(
            id,
            { product, provider, total, details },
            { new: true }
        )
            .populate("product", "name price")
            .populate("provider", "name contact_number");

        if (!updatedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        res.status(200).json({ message: "Purchase updated successfully", purchase: updatedPurchase });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE: Remove a purchase by ID
export const deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPurchase = await Purchase.findByIdAndDelete(id);

        if (!deletedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};