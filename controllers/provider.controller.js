import Provider from "../models/provider.js";

// Generate sequential provider ID
async function generateProviderId() {
    const lastProvider = await Provider.findOne().sort({ id: -1 });

    if (!lastProvider || !/^Pr\d{2}$/.test(lastProvider.id)) {
        return "Pr01";
    }

    const lastNumber = parseInt(lastProvider.id.substring(2), 10);
    const nextNumber = (lastNumber + 1).toString().padStart(2, "0");
    return `Pr${nextNumber}`;
}

// Get all providers
export const getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.status(200).json({ providers });
    } catch (error) {
        console.error("Error fetching providers:", error);
        res.status(500).json({ message: "Error fetching providers" });
    }
};

// Get provider by ID
export const getOneProvider = async (req, res) => {
    try {
        const provider = await Provider.findOne({ id: req.params.id });

        if (!provider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        res.status(200).json(provider);
    } catch (error) {
        console.error("Error fetching provider:", error);
        res.status(500).json({ message: "Error fetching provider" });
    }
};

// Create a new provider
export const postProvider = async (req, res) => {
    try {
        const { name, contact_number, address, email, personal_phone, status } = req.body;

        // Validations
        if (!name || !contact_number || !address || !email || !personal_phone || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }   
        if (!/^\d{10,}$/.test(contact_number)) {
            return res.status(400).json({ message: "Contact number must be at least 10 digits" });
        }
        if (!/^\d{10,}$/.test(personal_phone)) {
            return res.status(400).json({ message: "Personal phone must be at least 10 digits" });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (address.length < 5 || address.length > 100) {
            return res.status(400).json({ message: "Address must be between 5 and 100 characters" });
        }
        if (!["active", "inactive"].includes(status.toLowerCase())) {
            return res.status(400).json({ message: "Status must be 'active' or 'inactive'" });
        }

        const existingProvider = await Provider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ message: "A provider with this email already exists." });
        }

        const id = await generateProviderId();
        const newProvider = new Provider({ id, name, contact_number, address, email, personal_phone, status });

        await newProvider.save();
        res.status(201).json({ message: "Provider created successfully", id: newProvider.id, ...newProvider._doc });
    } catch (error) {
        console.error("Error creating provider:", error);
        res.status(500).json({ message: "Error creating provider" });
    }
};

// Update a provider
export const putProvider = async (req, res) => {
    try {
        const { name, contact_number, address, email, personal_phone, status } = req.body;

        // Validations (Only validate if the fields are provided)
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }        
        if (contact_number && !/^\d{10,}$/.test(contact_number)) {
            return res.status(400).json({ message: "Contact number must be at least 10 digits" });
        }
        if (personal_phone && !/^\d{10,}$/.test(personal_phone)) {
            return res.status(400).json({ message: "Personal phone must be at least 10 digits" });
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (address && (address.length < 5 || address.length > 100)) {
            return res.status(400).json({ message: "Address must be between 5 and 100 characters" });
        }
        if (status && !["active", "inactive"].includes(status.toLowerCase())) {
            return res.status(400).json({ message: "Status must be 'active' or 'inactive'" });
        }

        const updatedProvider = await Provider.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProvider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        res.status(200).json(updatedProvider);
    } catch (error) {
        console.error("Error updating provider:", error);
        res.status(500).json({ message: "Error updating provider" });
    }
};

// Delete a provider
export const deleteProvider = async (req, res) => {
    try {
        const deletedProvider = await Provider.findOneAndDelete({ id: req.params.id });

        if (!deletedProvider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        res.status(200).json({ message: "Provider deleted successfully" });
    } catch (error) {
        console.error("Error deleting provider:", error);
        res.status(500).json({ message: "Error deleting provider" });
    }
};
