class Processo {

    constructor(nome, relativePath, operacoes, vigencia, main, instancias, mapas, dataDoDeploy) {
        this.nome = nome;
        this.relativePath = relativePath; 
        this.operacoes = operacoes;
        this.vigencia = vigencia;
        this.main = main;
        this.instancias = instancias;
        this.mapas = mapas;
        this.dataDoDeploy = dataDoDeploy;
    }

}

module.exports = Processo;