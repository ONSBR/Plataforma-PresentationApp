export class Conta {
    constructor(
      public id: number,
      public titular: string,
      public saldo: number
    ) { }
}

export class Operacao {
  constructor(
    public id: number,
    public idContaOrigem: number,
    public idContaDestino: number,
    public valorTransferencia: number
  ) { }
}