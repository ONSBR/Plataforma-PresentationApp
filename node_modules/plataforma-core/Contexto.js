class Contexto {
    
    constructor(evento, instancia, dataSet, dataDeReferencia, eventoSaida){
        this.evento = evento;
        this.instancia = instancia;
        this.dataSet = dataSet;
        this.dataDeReferencia = dataDeReferencia;
        this.eventoSaida = eventoSaida;
    }
}

module.exports = Contexto;