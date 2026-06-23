// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
// API endpoint que devuelve la información del cliente
app.get('/api/whoami', function (req, res) {
  // Obtener la IP del cliente
  // En entornos con proxy (como Render, Heroku, Glitch), la IP real puede estar en 'x-forwarded-for'
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;

  // Obtener el idioma preferido desde el encabezado Accept-Language
  const language = req.headers['accept-language'];

  // Obtener el User-Agent (información del sistema/navegador)
  const software = req.headers['user-agent'];

  // Devolver la respuesta en JSON
  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
