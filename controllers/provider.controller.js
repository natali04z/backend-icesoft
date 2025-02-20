import Provider from '../models/provider.js';

// Method GET: Get all providers
export async function getProviders(req, res) {
    try {
        const providers = await Provider.find();
        res.status(200).json({ providers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching providers' });
    }
}

// Method GET: Get provider by ID
export async function getOneProvider(req, res) {
    const { id } = req.params;
    try {
        const provider = await Provider.findById(id);
        if (!provider) return res.status(404).json({ message: 'Provider not found' });
        res.status(200).json(provider);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching provider' });
    }
}

// Method POST: Create a new provider
export async function postProvider(req, res) {
    const { name, contact_number, address, email, personal_phone, status } = req.body;
    let msg = 'Provider created successfully';
    try {
        const newProvider = new Provider({ name, contact_number, address, email, personal_phone, status });
        await newProvider.save();
        res.status(201).json(newProvider);
    } catch (error) {
        msg = 'Error creating provider';
        res.status(500).json({ message: msg });
    }
}

// Method PUT: Update a provider
export async function putProvider(req, res) {
    const { id } = req.params;
    const { name, contact_number, address, email, personal_phone, status } = req.body;
    let msg = 'Provider updated successfully';
    try {
        const updatedProvider = await Provider.findByIdAndUpdate(
            id,
            { name, contact_number, address, email, personal_phone, status },
            { new: true }
        );
        if (!updatedProvider) return res.status(404).json({ message: 'Provider not found' });
        res.status(200).json(updatedProvider);
    } catch (error) {
        msg = 'Error updating provider';
        res.status(500).json({ message: msg });
    }
}

// Method DELETE: Delete a provider
export async function deleteProvider(req, res) {
    const { id } = req.params;
    let msg = 'Provider deleted successfully';
    try {
        const deletedProvider = await Provider.findByIdAndDelete(id);
        if (!deletedProvider) return res.status(404).json({ message: 'Provider not found' });
        res.status(200).json({ message: msg });
    } catch (error) {
        msg = 'Error deleting provider';
        res.status(500).json({ message: msg });
    }
}