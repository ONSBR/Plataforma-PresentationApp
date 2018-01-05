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
    public contaOrigem: Conta,
    public contaDestino: Conta,
    public valorTransferencia: number
  ) { }
}
