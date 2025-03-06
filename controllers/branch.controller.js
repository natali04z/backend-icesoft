import Branch from "../models/branches.js";

async function generateBranchId() {
    const lastBranch = await Branch.findOne().sort({ id: -1 });

    if (!lastBranch || !/^Br\d{2}$/.test(lastBranch.id)) {
        return "Br01";
    }

    const lastNumber = parseInt(lastBranch.id.substring(2), 10);
    const nextNumber = (lastNumber + 1).toString().padStart(2, "0");
    return `Br${nextNumber}`;
}

// Validación de campos
function validateBranchData(data, isUpdate = false) {
    const errors = {};

    // Validar nombre
    if (!isUpdate || data.name) {
        if (!data.name || data.name.trim() === "") {
            errors.name = "El nombre de la sucursal es obligatorio";
        } else if (data.name.length < 2 || data.name.length > 100) {
            errors.name = "El nombre debe tener entre 2 y 100 caracteres";
        }
    }

    // Validar ubicación
    if (!isUpdate || data.location) {
        if (!data.location || data.location.trim() === "") {
            errors.location = "La ubicación es obligatoria";
        } else if (data.location.length < 2 || data.location.length > 100) {
            errors.location = "La ubicación debe tener entre 2 y 100 caracteres";
        }
    }

    // Validar status
    if (!isUpdate || data.status) {
        const validStatuses = ["active", "inactive", "pending"];
        if (!data.status || !validStatuses.includes(data.status)) {
            errors.status = "Estado inválido. Debe ser: active, inactive o pending";
        }
    }

    // Validar teléfono (validación básica de formato)
    if (!isUpdate || data.phone) {
        const phoneRegex = /^[+]?[\d\s()-]{10,15}$/;
        if (!data.phone || !phoneRegex.test(data.phone)) {
            errors.phone = "Número de teléfono inválido";
        }
    }

    // Validar dirección
    if (!isUpdate || data.address) {
        if (!data.address || data.address.trim() === "") {
            errors.address = "La dirección es obligatoria";
        } else if (data.address.length < 5 || data.address.length > 200) {
            errors.address = "La dirección debe tener entre 5 y 200 caracteres";
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Get all branches
export const getBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        res.status(200).json({ branches });
    } catch (error) {
        console.error("Error fetching branches:", error);
        res.status(500).json({ message: "Error fetching branches" });
    }
};

// Get branch by ID
export const getBranchesById = async (req, res) => {
    try {
        const branch = await Branch.findOne({ id: req.params.id });

        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.status(200).json(branch);
    } catch (error) {
        console.error("Error fetching branch:", error);
        res.status(500).json({ message: "Error fetching branch" });
    }
};

// Create a new branch
export const postBranches = async (req, res) => {
    try {
        const { name, location, status, phone, address } = req.body;
        
        // Validar datos
        const validation = validateBranchData(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ 
                message: "Validation errors",
                errors: validation.errors
            });
        }
        
        // Verificar si ya existe una sucursal con el mismo nombre
        const existingBranch = await Branch.findOne({ name });
        if (existingBranch) {
            return res.status(409).json({ 
                message: "A branch with this name already exists" 
            });
        }
        
        const id = await generateBranchId();
        const newBranch = new Branch({ 
            id, 
            name, 
            location, 
            status, 
            phone, 
            address 
        });
        
        await newBranch.save();
        res.status(201).json({ 
            message: "Branch created successfully", 
            id: newBranch.id, 
           ...newBranch._doc 
        });
    } catch (error) {
        console.error("Error creating branch:", error);
        res.status(500).json({ 
            message: "Error creating branch",
            error: error.message
        });
    }
};

// Update a branch
export const updateBranches = async (req, res) => {
    try {
        // Verificar si la sucursal existe
        const existingBranch = await Branch.findById(req.params.id);
        if (!existingBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        // Validar datos para actualización
        const validation = validateBranchData(req.body, true);
        if (!validation.isValid) {
            return res.status(400).json({ 
                message: "Validation errors",
                errors: validation.errors
            });
        }

        // Verificar si el nombre de sucursal ya existe (excluyendo la sucursal actual)
        if (req.body.name) {
            const duplicateBranch = await Branch.findOne({ 
                name: req.body.name, 
                _id: { $ne: req.params.id } 
            });
            if (duplicateBranch) {
                return res.status(409).json({ 
                    message: "Datos correctos " 
                });
            }
        }

        // Actualizar sucursal
        const updatedBranch = await Branch.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedBranch);
    } catch (error) {
        console.error("Error updating branch:", error);
        res.status(500).json({ message: "Error updating branch", error: error.message });
    }
};

// Delete a branch
export const deleteBranches = async (req, res) => {
    try {
        const deletedBranch = await Branch.findByIdAndDelete(req.params.id);

        if (!deletedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.status(200).json({ message: "Branch deleted successfully" });
    } catch (error) {
        console.error("Error deleting branch:", error);
        res.status(500).json({ message: "Error deleting branch", error: error.message });
    }
};

export default {
    getBranches,
    getBranchesById,
    postBranches,
    updateBranches,
    deleteBranches
};