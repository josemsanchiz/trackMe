var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Puntos = require('../models/puntos');
var Ultimo = require('../models/ultimo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/puntos', function(req, res, next){
  Puntos.find({}, function(err,datos){
    if(err) {res.json({
      success: false,
      mensaje: 'Hay un error',
      datos: err
    })} else {
      res.json(datos);
    }
  })
})

router.get('/ultimo', function(req, res, next){
  Ultimo.find({}, function(err,datos){
    if(err) {res.json({
      success: false,
      mensaje: 'Hay un error',
      datos: err
    })} else {
      res.json(datos);
    }
  })
})

router.get('/borrar', function(req, res, next){
  Puntos.remove({}, function(err, datos){
    if(err){
      res.json({
        success:false,
        message: 'Hay un error',
        data: err
      })
    }
    res.json({
      success: true,
      message: 'Api Borrada'
    })
  })
})

module.exports = router;