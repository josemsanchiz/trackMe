var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var net = require('net');

var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var puntos = require('./routes/puntos');

var coordenadas = require('./controller/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Conexion a mongodb con mongoose

mongoose.connect('mongodb://localhost/trackme_pruebas', function(err){
    
    if (err) {
        console.log('Hay un error con la conexion: ' + err);
    } else {
        console.log('Conexion establecida!');
    }
    
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', puntos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



var servidor = net.createServer(function (socket) {
  socket.on("data", function (data) {
        console.log('raw data: ' + data);
        console.log('con el to string hecho:' + data.toString());
        var procesado = data.toString();
        coordenadas.procesarDatos(procesado);
        socket.destroy();
  });
  
  socket.on('end', function(){
    console.log('Device disconnected!');
  });
});

servidor.listen(3001);

module.exports = app;
