import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conta, Operacao } from '../Conta.model';
import { Cliente } from '../Cliente.model';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css']
})

export class ContaFormComponent implements OnInit {

  private presentationId: string = Guid.newGuid();

  contas: Conta[] = [];
  clientes: Cliente[] = [];
  model = new Conta(0, '', 0, null);
  valorDaTransferencia: number;
  contaOrigem: Conta;
  contaDestino: Conta;

  operacoes: Operacao[] = [];

  constructor(private http: HttpClient) {
    this.consultaListaCompletaDeContas();
    this.consultaListaCompletaDeTransferencias();
  }

  ngOnInit() {

      // TODO Pooling para realizar o papel do websocket, para receber mensagem para o client.
      const self = this;
      setInterval(() => {
        const urlEvt = environment.urlEventManager + self.presentationId;
        self.http.get(urlEvt, {responseType: 'json', withCredentials: false}).subscribe(data => {

          const listaEventos: any = data;
          if (listaEventos && listaEventos.length > 0) {
            for (let i = 0; i < listaEventos.length; i++) {
              const evt = listaEventos[i];
              self.eventDone(evt);
            }
          }
        });
      }, 2000);

  }

  // TODO: Verifica se o evento é esperado pela camada de apresentação.
  eventDone(evt) {
    if (evt.name === 'account.saved') {
      if (evt.reproducao) {
        alert('Reprodução do cadastro da conta realizada!');
      } else {
        alert('Conta Confirmada!');
        evt.payload.instanciaOriginal = evt.instancia;
        this.consultaListaCompletaDeContas();
      }
    } else if (evt.name === 'transfer.confirmation') {
      if (evt.reproducao) {
        alert('Reprodução da transferência realizada!');
      } else {
        this.consultaListaCompletaDeContas();
        this.consultaListaCompletaDeTransferencias();
        alert('Transferência realizada com sucesso!');
      }
    }
  }

  consultaListaCompletaDeContas() {
    const headers = new HttpHeaders().set('Instance-Id', this.presentationId);
    this.http.get(environment.urlDomainAppConta, {headers}).subscribe(data => {
      this.contas = <Conta[]> data;
    });
  }

  consultaListaCompletaDeTransferencias() {
    const headers = new HttpHeaders().set('Instance-Id', this.presentationId);
    this.http.get(environment.urlDomainAppTransferencia, {headers}).subscribe(data => {
      this.operacoes = <Operacao[]> data;
    });
  }

  reproduzir(instanciaOriginal) {
    const url = environment.urlServerPresentation + 'reproductionconta';
    this.http.put(url, { instanciaOriginal: instanciaOriginal }, {responseType: 'json', withCredentials: false}).subscribe(data => {
      console.log('url: ' + url + ', res: ' + data);
    });
  }

  onSubmit(form: Conta): void {

    const conta = new Conta(this.contas.length, form.titular, Number(form.saldo), null);

    const presentationId = this.presentationId;

    const url = environment.urlServerPresentation + 'account';

    this.http.put(url, { presentationId: presentationId, conta: conta }, {responseType: 'json', withCredentials: false}).subscribe(data => {

      console.log('url: ' + url + ', res: ' + data);
    });

  }

  transferir(event): void {
    event.preventDefault();

    const operacao = new Operacao(
      this.operacoes.length,
      this.contaOrigem,
      this.contaDestino,
      Number(this.valorDaTransferencia),
      null
    );

    const url = environment.urlServerPresentation + 'transfer';

    const presentationId = this.presentationId;

    this.http.put(url, { presentationId: presentationId, operacao: operacao },
          {responseType: 'json', withCredentials: false}).subscribe(data => {
      console.log('url: ' + url + ', res: ' + data);
    });

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

