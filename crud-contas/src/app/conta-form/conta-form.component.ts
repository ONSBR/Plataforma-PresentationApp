import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Conta, Operacao } from '../Conta.model';

@Component({
  selector: 'conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css']
})

export class ContaFormComponent implements OnInit {
  
  private presentationId: string = Guid.newGuid();

  contas: Conta[] = [];
  model = new Conta(0, "", 0);
  valorDaTransferencia: number;
  contaOrigem: number;
  contaDestino: number;

  operacoes: Operacao[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

      var self = this;
      setInterval(() => { 
        var urlEvt = "http://localhost:8086/event?presentationId=" + self.presentationId;
        
        self.http.get(urlEvt, {responseType: "json", withCredentials:false}).subscribe(data => {
          
          var listaEventos: any = data;
          if (listaEventos && listaEventos.length > 0) {
            
            for(var i=0; i<listaEventos.length; i++){
              var evt = listaEventos[i];
              self.doneEvent(evt);
            }
          }
        });
      }, 2000);

  }

  doneEvent(evt) {
    if(evt.name == "account.saved") {
      alert("Conta Confirmada!");
      this.contas.push(evt.payload);
    }
  }

  getConta(idConta): Conta {
    return this.contas[idConta];
  }

  onSubmit(form: Conta): void {  

    var conta = new Conta(this.contas.length, form.titular, Number(form.saldo));
    
    var presentationId = this.presentationId;

    var url = "http://localhost:8083/account";

    this.http.put(url, { presentationId: presentationId, conta: conta }, {responseType: "json", withCredentials:false}).subscribe(data => {
      
      console.log("url: " + url + ", res: " + +data);
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

class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}

