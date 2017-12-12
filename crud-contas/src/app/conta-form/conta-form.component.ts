import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Conta, Operacao } from '../Conta.model';

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

    operacoes: Operacao[] = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
  }

  getConta(idConta): Conta {
    return this.contas[idConta];
  }

  onSubmit(form: Conta): void {  

    var conta = new Conta(this.contas.length, form.titular, Number(form.saldo));
    
    var url = "http://localhost:8083/account";

    this.http.put(url, conta, {responseType: "json", withCredentials:false}).subscribe(data => {
      this.contas.push(<Conta>data);
      console.log(data);
    });

    console.log(this.contas);
  }

  transferir(event): void {  
    event.preventDefault();

    var operacao = new Operacao(
      this.operacoes.length,
      this.contaOrigem, 
      this.contaDestino, 
      Number(this.valorDaTransferencia)
    );

    this.contas[operacao.idContaOrigem].saldo = this.contas[operacao.idContaOrigem].saldo - operacao.valorTransferencia;
    this.contas[operacao.idContaDestino].saldo = this.contas[operacao.idContaDestino].saldo + operacao.valorTransferencia;

    this.operacoes.push(operacao);
  }

}
