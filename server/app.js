var config = require('./config');
var eventHelper = require("plataforma-sdk/EventHelper");
var Evento = require("plataforma-core/Evento");
var EventCatalog = require("plataforma-processapp/conta-process-app/metadados/EventCatalog");
var ClientEventCatalog = require("plataforma-processapp/cliente-process-app/metadados/EventCatalog");

var CoreRepository = require("plataforma-sdk/services/CoreRepository");
var Client = require('node-rest-client').Client;


// Dependencies
// ===========================================================
var express = require("express");
var bodyParser = require("body-parser");

// Configure the Express application
// ===========================================================
var app = express();
var PORT = config.PORT;

var coreRepository = new CoreRepository();

// Set up the Express application to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
// Add headers
app.use(function (req, res, next) {
  
      // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

/**
 * Recebe os eventos para serem enviados ao executor,
 * por enquanto está sendo feito um curto circuito e enviando 
 * diretamente para o executor na URL configurada.
 */
app.put("/account", function(req, res) {

  console.log("___ENTER PUT CONTA___" + req.body.presentationId); 

  var presentationId = req.body.presentationId;
  var account = req.body.conta;

  var evento = new Evento();
  evento.processName = "cadastra-conta";
  evento.name = EventCatalog.account_put;
  evento.payload = account;
  evento.origem = presentationId;

  eventHelper.sendEvent(evento);

  res.send("OK");
});

app.put("/transfer", function(req, res) {
  
    console.log("___ENTER PUT TRANSFERENCIA___" + req.body.presentationId); 
  
    var presentationId = req.body.presentationId;
  
    var evento = new Evento();
    evento.processName = "transferencia-conta";
    evento.name = EventCatalog.transfer_request;
    evento.payload = req.body;
    evento.origem = presentationId;
  
    console.log("___EVENTO___" + EventCatalog.transfer_request); 

    eventHelper.sendEvent(evento);
  
    res.send("OK");
  });

  app.put("/reproductionconta", function(req, res) {
    
    console.log("___ENTER PUT REPRODUCTION___" + req.body.instanciaOriginal); 
  
    var presentationId = req.body.presentationId;
  
    var evento = new Evento();
    evento.name = "system.event.reproduction";
    evento.payload = req.body;
    evento.origem = presentationId;
  
    eventHelper.sendEvent(evento);
  
    res.send("OK");
  });

  app.get("/comparereproduction/:reproductionId", function(req, res) {
    
    var reproductionId = req.params.reproductionId;

    console.log("___ENTER PUT REPRODUCTION___" + reproductionId); 

    var reproducao = coreRepository.getReproduction(reproductionId);

    var processInstance = coreRepository.getProcessInstance(reproducao.instanciaOriginal);

    var args = { headers: { "Content-Type": "application/json" } };

    var urlGetProcessMemoryOriginal = config.processMemoryUrl + processInstance.processo + "/" + reproducao.instanciaOriginal + "/history";
    var client = new Client();
  
    var memoriasOriginal = null;

    var reqMemoriasOriginal = client.get(urlGetProcessMemoryOriginal, function (data, response) {
      
        var memoriasOriginal = data;

        var urlGetProcessMemoryReproc = config.processMemoryUrl + processInstance.processo + "/" + reproducao.instanciaReproducao + "/history";
        
        var reqMemoriasReproc = client.get(urlGetProcessMemoryReproc, function (data, response) {
            
            var memoriasReproc = data;
            
            var retorno = { memoriaProcessoOriginal: memoriasOriginal, memoriaProcessoReproducao: memoriasReproc};
            retorno.jsonMemoryOrigem
        
            res.send(retorno);

        });
        reqMemoriasReproc.on('error', function (err) {
            console.log('request error', err);
        });

    });
    reqMemoriasOriginal.on('error', function (err) {
        console.log('request error', err);
    });

  });

  app.put("/client", function(req, res) {
    
      console.log("___ENTER PUT CLIENT___" + req.body.presentationId); 
    
      var presentationId = req.body.presentationId;
      var cliente = req.body.cliente;
    
      var evento = new Evento();
      evento.processName = "cadastra-cliente";
      evento.name = ClientEventCatalog.client_put;
      evento.payload = cliente;
      evento.origem = presentationId;
    
      eventHelper.sendEvent(evento);
    
      res.send("OK");
    });


// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});