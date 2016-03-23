var mongoose = require('mongoose');

var DispositivosSchema = new mongoose.Schema({
  
  nombre: {
    type: String
  },
  uuid: {
    type: String
  },
  creacion: {
    type: Date,
    default: Date.now
  }
  
})

module.exports = mongoose.model('Dispositivo', DispositivosSchema);