var mongoose = require('mongoose');

var PuntosSchema = new mongoose.Schema({
  
  dispositivo: String,
  lat: String,
  lng: String,
  creacion: {
    type: Date,
    default: Date.now
  }
  
})

module.exports = mongoose.model('Punto', PuntosSchema);