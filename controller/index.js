var mongoose = require('mongoose');

var Punto = require('../models/puntos');
var Ultimo = require('../models/ultimo');

module.exports.procesarDatos = function(datos){
  
  console.log('Recibo datos: ' + datos);
  
  var resultado = datos.split(',');
  
  var lat_pos = resultado[5];
  var lat_pos_i = resultado[6];
  
  var lng_pos = resultado[7];
  var lng_pos_i = resultado[8];
  
  function getCoordinates(pos, pos_i){
    if(typeof(pos_i) == "undefined")pos_i = "N";
	var dg = parseInt(pos/100);
	var minutes = pos-(dg*100);
	var res = (minutes/60)+dg;
	return (pos_i.toUpperCase()=="S" || pos_i.toUpperCase()=="W")?res*-1:res;
  }
  
  var latitud = getCoordinates(lat_pos, lat_pos_i);
  var longitud = getCoordinates(lng_pos, lng_pos_i);
  
  console.log('Latitud: ' + latitud + ' Longitud: ' + longitud);
  
  if(latitud === 'NaN'){
    console.log('Datos no validos');
  } else {
    Punto.create({
      dispositivo: resultado[1],
      lat: latitud,
      lng: longitud
    }, function(puntoCreado){
      console.log('Punto creado correctamente: ' + puntoCreado);
    })
    
    Ultimo.findOne({'dispositivo': resultado[1]}, function(err, datos){
      console.log('Datos....: ' + datos);
      if(err) throw err
      if(!datos){
        Ultimo.create({
          dispositivo: resultado[1],
          lat: latitud,
          lng: longitud
        }, function(ultimoPunto){
          console.log('Ultimo punto creado: ' + ultimoPunto);
        })
      } else {
        console.log('Datos: ' +datos);
        datos.dispositivo = resultado[1];
        datos.lat = latitud;
        datos.lng = longitud;
        datos.creado = Date.now();
        datos.save();
      }
    })
  }
  
}