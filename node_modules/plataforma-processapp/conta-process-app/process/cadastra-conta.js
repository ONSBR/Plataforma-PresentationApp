var Evento = require("../../../Plataforma-core/Evento");
var EventCatalog = require("../metadados/EventCatalog");

function insereConta(contexto) {
    //FIXME Criar classe Cliente
    contexto.dataSet.save(getClient(contexto.evento.payload), "Client");
    console.log(contexto.evento.payload);

    contexto.eventoSaida = new Evento(
        EventCatalog.account_saved, 
        contexto.evento.processName,
        new Date(), 
        contexto.instancia, null, 
        contexto.evento.payload, 
        contexto.evento.origem
    );
}

function getClient(account) {
    return '[{ "saldo":' + account.saldo + ', "_metadata": { "type": "conta", "changeTrack": "create" } }]';
}


module.exports.insereConta = insereConta