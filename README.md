#  Curso Avançado de Angular - Observable

##  Promises e Observables

Ao consumir uma API, quando for feito uma requisição, esperamos uma resposta um **"callback"**. <br>
Essa resposta(callback), ela vai ser gerenciada por uma **_Promise_** ou por uma **_Observable_**, para isso existem alguns protocolos.<br>

**_Pull_** e **_Push_** são dois protocolos diferentes que descrevem como um _produtor_ de dados pode se comunicar com um _consumidor_ de dados. <br>

Como exemplo, cada **função Javascript** é um sistema **Pull**, ou seja, a função é um produtor de dados, e o código que chama a função é o consumidor "**Pull**". <br>

Nos sistemas **_Pull_**, o Consumidor determina quando recebe os dados do Produtor de dados. O próprio Produtor não tem conhecimento de quando os dados serão entregues ao Consumidor.  <br>

Em sistemas **_Push_**, o Produtor determina quando enviar os dados ao Consumidor. O Consumidor não sabe quando receberá esses dados. <br>


## Promise

Uma **Promise**(Produtor) entrega um valor resolvido para retornos de chamada registrados(Consumidores), mas diferente das funções, é a Promise que se encarrega de determinar precisamente quando esse valor é "enviado" para os retornos de chamada. <br> 

**Promise** é um objeto usado para processamento assíncrono. Uma **Promise** (de _"promessa"_) representa um valor que pode estar disponível agora, no futuro ou nunca. <br>
Uma **Promise** permite a associação de métodos de tratamento para eventos da ação assíncrona num caso eventual de sucesso ou de falha. <br> 
Uma promessa pendente pode se tornar _realizada_ com um valor ou _rejeitada_ por um motivo (erro).
Quando um desses estados ocorre, o método **then** do Promise é chamado, e ele chama o método de tratamento associado ao estado (**rejected** ou **resolved**).<br>
Exemplo: <br>

 ~~~typescript  
  minhaPromise(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === 'Alice') {
          resolve(`Bem vindo ${nome}`);
      }
      else {
        reject('Ops! Você não é Alice');
      }
    })
  }
~~~

 ~~~typescript
   this.minhaPromise('André')
      .then(result => // sua lógica)
      .catch(erro => // sua lógica)
~~~

## Observable


**_Observable_** é um sistema "Push" para JavaScript ele é um Produtor de múltiplos valores, que emite notificações sempre que ocorre uma mudança em um de seus itens, ele notifica ("pushing") esses valores para os **_Observers_** (Consumidores), o Observer é uma coleção de callbacks que sabe escutar os valores que são entregues pelo Observable. E para utilizarmos o Observable precisamos chamar(assinar) com **_Subscribers_**. <br>

#### Para facilitar: 
 
* **_Observable_**: Emite notificações quando ocorrer mudanças no objeto.
* **_Observer_**: Escuta as alterações enviadas pelo Observable.
* **_Subscriber_**: Chama(assina) o Observable. <br>



Observer:

 ~~~typescript  
    const observer = {
      next: (valor: any) => this.logStyle('NEXT: ', 'cyan', valor),
      error: (erro: any) => this.logStyle('ERRO: ', 'cyan', erro),
      complete: () => this.logStyle('FIM: ', 'yellow', ''),
    }
 ~~~

Observable:

 ~~~typescript  
	  minhaObservable(nome: string): Observable<string> {
	    return new Observable(subscriber => {
	        subscriber.next('Next');
	        subscriber.next('Next 2');
	        setTimeout(() => {
	          subscriber.next('Olá de Novo com delay');
	        }, 2000);
	        subscriber.complete();
		   subscriber.error('Ops! Ocorreu um erro!');
	      }
	    });
	  }
 ~~~

Subscriber:

 ~~~typescript  
    this.minhaObservable('')
      .subscribe(
        result => this.logStyle('Observable: ', 'magenta', result),
        erro => this.logStyle('Observable erro: ', 'magenta', erro))
 ~~~

##  Padrão de Projeto Observer:

O Observer é um padrão de projeto comportamental que permite que um objeto notifique outros objetos sobre alterações em seu estado. O padrão Observer fornece uma maneira de assinar e cancelar a assinatura desses eventos para qualquer objeto que implemente uma interface de assinante.
