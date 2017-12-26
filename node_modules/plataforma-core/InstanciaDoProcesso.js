class InstanciaDoProcesso {

    constructor(id, dataInicioDaExecucao, dataFimDaExecucao, status, responsavel, processo, 
        dataDeReferencia) {
            this.id = id;
            this.dataInicioDaExecucao = dataInicioDaExecucao;
            this.dataFimDaExecucao = dataFimDaExecucao;
            this.status = status;
            this.responsavel = responsavel;
            this.processo = processo;
            this.dataDeReferencia = dataDeReferencia;
    }

}

module.exports = InstanciaDoProcesso;