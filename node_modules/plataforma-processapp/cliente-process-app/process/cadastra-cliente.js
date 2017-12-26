var Evento = require("../../../Plataforma-core/Evento");
var EventCatalog = require("../metadados/EventCatalog");

function insereCliente(contexto) {
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
    return '[{ "nome":' + account.titular + ', "_metadata": { "type": "cliente", "changeTrack": "create" } }]';
}


module.exports.insereCliente = insereCliente