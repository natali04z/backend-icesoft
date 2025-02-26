import Purchase from "../models/purchase.js";
import Product from "../models/product.js";
import Provider from "../models/provider.js";

// Function to generate purchase ID
async function generatePurchaseId() {
    const lastPurchase = await Purchase.findOne().sort({ createdAt: -1 });
    if (!lastPurchase || !/^Pu\d{2}$/.test(lastPurchase.id)) {
        return "Pu01";
    }

    const lastNumber = parseInt(lastPurchase.id.substring(2), 10);
    const nextNumber = (lastNumber + 1).toString().padStart(2, "0");
    return `Pu${nextNumber}`;
}

// GET: Retrieve all purchases
export const getPurchases = async (req, res) => {
    try {
        console.log("Fetching all purchases...");
        const purchases = await Purchase.find()
            .select("id total details")
            .populate("product", "name price")
            .populate("provider", "name contact_number");

        console.log("Purchases retrieved:", purchases.length);
        res.status(200).json({ message: "Purchases retrieved successfully", data: purchases });
    } catch (error) {
        console.error("Error fetching purchases:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET: Retrieve a single purchase by ID
export const getPurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching purchase with ID: ${id}`);

        const purchase = await Purchase.findById(id)
            .select("id total details")
            .populate("product", "name price")
            .populate("provider", "name contact_number");

        if (!purchase) {
            console.warn(`Purchase with ID ${id} not found`);
            return res.status(404).json({ message: "Purchase not found" });
        }

        console.log("Purchase retrieved:", purchase);
        res.status(200).json({ message: "Purchase retrieved successfully", data: purchase });
    } catch (error) {
        console.error("Error fetching purchase:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST: Create a new purchase
export const postPurchase = async (req, res) => {
    try {
        console.log("Creating a new purchase:", req.body);
        const { product, provider, total, details } = req.body;

        if (![product, provider, details].every(Boolean)) {
            console.warn("Missing required fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            console.warn(`Product with ID ${product} not found`);
            return res.status(404).json({ message: "Product not found" });
        }

        const existingProvider = await Provider.findById(provider);
        if (!existingProvider) {
            console.warn(`Provider with ID ${provider} not found`);
            return res.status(404).json({ message: "Provider not found" });
        }

        const id = await generatePurchaseId();

        const newPurchase = new Purchase({ id, product, provider, total, details });
        await newPurchase.save();

        console.log("Purchase created successfully:", newPurchase);
        res.status(201).json({ message: "Purchase created successfully", data: newPurchase });
    } catch (error) {
        console.error("Error creating purchase:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT: Update an existing purchase
export const updatePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Updating purchase with ID: ${id}`, req.body);
        const { product, provider, total, details } = req.body;

        if (product) {
            const existingProduct = await Product.findById(product);
            if (!existingProduct) {
                console.warn(`Product with ID ${product} not found`);
                return res.status(404).json({ message: "Product not found" });
            }
        }

        if (provider) {
            const existingProvider = await Provider.findById(provider);
            if (!existingProvider) {
                console.warn(`Provider with ID ${provider} not found`);
                return res.status(404).json({ message: "Provider not found" });
            }
        }

        const updatedPurchase = await Purchase.findByIdAndUpdate(
            id,
            { product, provider, total, details },
            { new: true }
        )
            .select("id total details")
            .populate("product", "name price")
            .populate("provider", "name contact_number");

        if (!updatedPurchase) {
            console.warn(`Purchase with ID ${id} not found`);
            return res.status(404).json({ message: "Purchase not found" });
        }

        console.log("Purchase updated successfully:", updatedPurchase);
        res.status(200).json({ message: "Purchase updated successfully", data: updatedPurchase });
    } catch (error) {
        console.error("Error updating purchase:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE: Remove a purchase by ID
export const deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting purchase with ID: ${id}`);

        const deletedPurchase = await Purchase.findByIdAndDelete(id);

        if (!deletedPurchase) {
            console.warn(`Purchase with ID ${id} not found`);
            return res.status(404).json({ message: "Purchase not found" });
        }

        console.log("Purchase deleted successfully");
        res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
        console.error("Error deleting purchase:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}