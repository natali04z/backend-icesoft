const express = require('express');
const SucursalController = require('../controllers/branches.controller');

const router = express.Router();
const sucursalController = new SucursalController();

// Usar las rutas definidas en el controller
router.use('/sucursales', sucursalController.getRouter());

module.exports = router;