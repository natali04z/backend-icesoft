const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
  idSucursal: { type: mongoose.Schema.Types.ObjectId, auto: true },
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true }
});

module.exports = mongoose.model('Sucursal', SucursalSchema);