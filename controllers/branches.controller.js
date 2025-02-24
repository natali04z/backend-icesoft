import SucursalRepository from '../repositories/sucursalRepository.js';

// Obtener todas las sucursales
export const getSucursales = async (req, res) => {
    try {
        const sucursalRepository = new SucursalRepository();
        const sucursales = await sucursalRepository.findAll();
        res.status(200).json(sucursales);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener sucursal por ID
export const getSucursalById = async (req, res) => {
    try {
        const { id } = req.params;
        const sucursalRepository = new SucursalRepository();
        const sucursal = await sucursalRepository.findById(id);

        if (!sucursal) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }

        res.status(200).json(sucursal);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Crear una nueva sucursal
export const postSucursal = async (req, res) => {
    try {
        const sucursalRepository = new SucursalRepository();
        const nuevaSucursal = await sucursalRepository.save(req.body);
        
        res.status(201).json({ message: 'Sucursal creada exitosamente', sucursal: nuevaSucursal });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Actualizar una sucursal
export const updateSucursal = async (req, res) => {
    try {
        const { id } = req.params;
        const sucursal = req.body;
        const sucursalRepository = new SucursalRepository();

        if (id !== sucursal.idSucursal) {
            return res.status(400).json({ message: 'ID no coincide' });
        }

        const exists = await sucursalRepository.existsById(id);
        if (!exists) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }

        const sucursalActualizada = await sucursalRepository.save(sucursal);
        
        res.status(200).json({ message: 'Sucursal actualizada exitosamente', sucursal: sucursalActualizada });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Eliminar una sucursal
export const deleteSucursal = async (req, res) => {
    try {
        const { id } = req.params;
        const sucursalRepository = new SucursalRepository();
        
        const exists = await sucursalRepository.existsById(id);
        if (!exists) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }

        await sucursalRepository.deleteById(id);
        
        res.status(200).json({ message: 'Sucursal eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};