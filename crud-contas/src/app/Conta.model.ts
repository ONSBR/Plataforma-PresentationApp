export class Conta {
    constructor(
      public id: number,
      public titular: string,
      public saldo: number,
      public _metadata: Metadata
    ) { }
}

export class Operacao {
  constructor(
    public id: number,
    public contaOrigem: Conta,
    public contaDestino: Conta,
    public valorTransferencia: number,
    public _metadata: Metadata
  ) { }
}

export class Metadata {
  constructor(
    public type: string,
    public instance_id: string
  ) { }
}
