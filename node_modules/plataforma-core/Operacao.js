class Operacao {

    constructor(arquivo, metodo, eventosDeEntrada, eventosDeSaida, processo, mustcommit) {
        this.arquivo = arquivo;
        this.metodo = metodo;
        this.eventosDeEntrada = eventosDeEntrada;
        this.eventosDeSaida = eventosDeSaida;
        this.processo = processo;
        this.mustcommit = mustcommit;
    }

}

module.exports = Operacao;