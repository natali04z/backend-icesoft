const express = require('express');
const router = express.Router();
const SucursalRepository = require('../repositories/sucursalRepository');

class SucursalController {
    constructor() {
        this.sucursalRepository = new SucursalRepository();
        this.router = router;
        this.initializeRoutes();
    }

    initializeRoutes() {
        // GET: Obtener todas las sucursales
        this.router.get('/', async (req, res) => {
            try {
                const sucursals = await this.sucursalRepository.findAll();
                res.status(500).json(sucursals);
            } catch (error) {
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        });

        // GET: Obtener una sucursal por ID
        this.router.get('/:id', async (req, res) => {
            try {
                const sucursal = await this.sucursalRepository.findById(req.params.id);
                if (!sucursal) {
                    return res.status(404).json({ message: 'Sucursal no encontrada' });
                }
                res.status(200).json(sucursal);
            } catch (error) {
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        });

        // PUT: Actualizar una sucursal
        this.router.put('/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const sucursal = req.body;

                if (id !== sucursal.idSucursal) {
                    return res.status(400).json({ message: 'ID no coincide' });
                }

                const exists = await this.sucursalRepository.existsById(id);
                if (!exists) {
                    return res.status(404).json({ message: 'Sucursal no encontrada' });
                }

                await this.sucursalRepository.save(sucursal);
                res.status(204).send();
            } catch (error) {
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        });

        // POST: Crear una nueva sucursal
        this.router.post('/', async (req, res) => {
            try {
                const nuevaSucursal = await this.sucursalRepository.save(req.body);
                res.status(201).json(nuevaSucursal);
            } catch (error) {
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        });

        // DELETE: Eliminar una sucursal
        this.router.delete('/:id', async (req, res) => {
            try {
                const exists = await this.sucursalRepository.existsById(req.params.id);
                if (!exists) {
                    return res.status(404).json({ message: 'Sucursal no encontrada' });
                }

                await this.sucursalRepository.deleteById(req.params.id);
                res.status(204).send();
            } catch (error) {
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = SucursalController;