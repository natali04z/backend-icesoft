const express = require("express");
const { obtenerVentas, crearVenta, actualizarVenta, eliminarVenta } = require("../controllers/ventas.controller");

const router = express.Router();

router.get("/", obtenerVentas);
router.post("/", crearVenta);
router.put("/:id", actualizarVenta);
router.delete("/:id", eliminarVenta);

module.exports = router;
