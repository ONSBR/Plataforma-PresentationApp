import { Component, OnInit } from '@angular/core';

import { Conta } from '../Conta.model';

@Component({
  selector: 'conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css']
})

export class ContaFormComponent implements OnInit {
    contas: Conta[] = [];
    model = new Conta(0, "", 0);
    valorDaTransferencia: number;
    contaOrigem: number;
    contaDestino: number;

    constructor() {
    }

    ngOnInit() {
  }

  onSubmit(form: Conta): void {  
    this.contas.push(new Conta(this.contas.length, form.titular, Number(form.saldo)));
    console.log(this.contas);
  }

  transferir(event): void {  
    event.preventDefault();
    this.contas[this.contaOrigem].saldo = this.contas[this.contaOrigem].saldo - this.valorDaTransferencia;
    this.contas[this.contaDestino].saldo = this.contas[this.contaDestino].saldo + Number(this.valorDaTransferencia);
  }

}
