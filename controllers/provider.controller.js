import Provider from "../models/provider.js";

// Method GET: Get all providers
export async function getProviders(req, res) {
    try {
        console.log("Fetching all providers...");
        const providers = await Provider.find();
        res.status(200).json({ message: "Providers retrieved successfully", data: providers });
    } catch (error) {
        console.error("Error fetching providers:", error);
        res.status(500).json({ message: "Error fetching providers", error: error.message });
    }
}

// Method GET: Get provider by ID
export async function getOneProvider(req, res) {
    const { id } = req.params;
    try {
        console.log(`Fetching provider with ID: ${id}`);
        const provider = await Provider.findById(id);
        if (!provider) {
            console.warn(`Provider with ID ${id} not found`);
            return res.status(404).json({ message: "Provider not found" });
        }
        res.status(200).json({ message: "Provider retrieved successfully", data: provider });
    } catch (error) {
        console.error("Error fetching provider:", error);
        res.status(500).json({ message: "Error fetching provider", error: error.message });
    }
}

// Method POST: Create a new provider
export async function postProvider(req, res) {
    const { name, contact_number, address, email, personal_phone, status } = req.body;
    try {
        console.log("Creating a new provider:", req.body);
        const newProvider = new Provider({ name, contact_number, address, email, personal_phone, status });
        await newProvider.save();
        res.status(201).json({ message: "Provider created successfully", data: newProvider });
    } catch (error) {
        console.error("Error creating provider:", error);
        res.status(500).json({ message: "Error creating provider", error: error.message });
    }
}

// Method PUT: Update a provider
export async function putProvider(req, res) {
    const { id } = req.params;
    const { name, contact_number, address, email, personal_phone, status } = req.body;
    try {
        console.log(`Updating provider with ID: ${id}`, req.body);
        const updatedProvider = await Provider.findByIdAndUpdate(
            id,
            { name, contact_number, address, email, personal_phone, status },
            { new: true }
        );
        if (!updatedProvider) {
            console.warn(`Provider with ID ${id} not found`);
            return res.status(404).json({ message: "Provider not found" });
        }
        res.status(200).json({ message: "Provider updated successfully", data: updatedProvider });
    } catch (error) {
        console.error("Error updating provider:", error);
        res.status(500).json({ message: "Error updating provider", error: error.message });
    }
}

// Method DELETE: Delete a provider
export async function deleteProvider(req, res) {
    const { id } = req.params;
    try {
        console.log(`Deleting provider with ID: ${id}`);
        const deletedProvider = await Provider.findByIdAndDelete(id);
        if (!deletedProvider) {
            console.warn(`Provider with ID ${id} not found`);
            return res.status(404).json({ message: "Provider not found" });
        }
        res.status(200).json({ message: "Provider deleted successfully" });
    } catch (error) {
        console.error("Error deleting provider:", error);
        res.status(500).json({ message: "Error deleting provider", error: error.message });
    }
}
