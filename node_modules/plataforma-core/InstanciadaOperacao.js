class InstanciaDaOperacao {
    
    constructor(id, vigencia, status, contexto, instanciaDoProcesso) {
        this.id = id;
        this.vigencia = vigencia;
        this.status = status;
        this.contexto = contexto;
        this.instanciaDoProcesso = instanciaDoProcesso;
    }
}

module.exports = InstanciaDaOperacao;