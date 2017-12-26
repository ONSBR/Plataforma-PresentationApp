class Evento {
    constructor(name, processName, dataDoEvento, instancia, responsavel, payload, origem, dataRef) {
        this.name = name;
        this.processName = processName;
        this.dataDoEvento = dataDoEvento;
        this.instancia = instancia;
        this.responsavel = responsavel;
        this.payload = payload;
        this.origem = origem;
        this.dataRef = dataRef;
    }
}

module.exports = Evento;