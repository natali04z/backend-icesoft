const Venta = require("../models/Ventas");


// Obtener todas las ventas
const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ventas" });
  }
};

// Crear nueva venta
const crearVenta = async (req, res) => {
  try {
    const nuevaVenta = new Venta(req.body);
    await nuevaVenta.save();
    res.json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ error: "Error al crear venta" });
  }
};

// Actualizar venta
const actualizarVenta = async (req, res) => {
  try {
    const ventaActualizada = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ventaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar venta" });
  }
};

// Eliminar venta
const eliminarVenta = async (req, res) => {
  try {
    await Venta.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Venta eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar venta" });
  }
};

module.exports = { obtenerVentas, crearVenta, actualizarVenta, eliminarVenta };
