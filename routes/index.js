var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Puntos = require('../models/puntos');
var Ultimo = require('../models/ultimo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/pruebas', function(req, res, next){
  Ultimo.findOne({
    'dispositivo': '4109137133'
  }, function(err, datos){
    console.log('Datos....: ' + datos)
    if(!datos){
      console.log('No hay datos');
    } else {
      console.log('Si hay datos');
      datos.lat = '39.883333';
      datos.lng = '-0.034433';
      datos.creacion = Date.now();
      datos.save();
    }
  })
})
module.exports = router;
