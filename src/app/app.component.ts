import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>
    
  `,
  styles: []
})

export class AppComponent implements OnInit {
  logStyle(msg: string, cor: string, log: any) {
    return console.log(`%c ${msg}` + log, `color: ${cor}; background: #10100F;`)
  }

  ngOnInit(): void {

    // Inicio da chamada da Promise
    this.minhaPromise('Alice')
      .then(result => console.log(`%c Promise result: ` + result, `color: lawngreen; background: #10100F;`))

    this.minhaPromise('André')
      .then(result => this.logStyle('Promise result: ', 'green', result))
      .catch(erro => this.logStyle('Promise erro: ', 'lime', erro))
    // Fim da chamada da Promise

    // Inicio da chamada da Oservable
    this.minhaObservable('')
      .subscribe(
        result => this.logStyle('Observable: ', 'magenta', result),
        erro => this.logStyle('Observable erro: ', 'magenta', erro))
    // Fim da chamada da Oservable

    // Inicio da chamada da Observable com Observer customizado
    const observer = {
      next: (valor: any) => this.logStyle('NEXT: Observable com observer customizado: ', 'cyan', valor),
      error: (erro: any) => this.logStyle('ERRO: Observable com observer customizado: ', 'cyan', erro),
      complete: () => this.logStyle('FIM: Observable com observer customizado: ', 'yellow', ''),
    }

    const observable = this.minhaObservable('Alice')
    observable.subscribe(observer);
    // Fim da chamada da Observable com Observer customizado

    // Inicio da chamada da Observable usuario
    const observerUsuario = {
      next: (valor: any) => this.logStyle('NEXT: Observable Usuario observer customizado: ', 'turquoise', JSON.stringify(valor, null, 2)),
      error: (erro: any) => this.logStyle('ERRO: Observable Usuario observer customizado: ', 'red', erro),
      complete: () => this.logStyle('FIM: Observable Usuario observer customizado: ', 'yellow', ''),
    }

    const observableUsarioErro = this.usuarioObservable('André', 'admin@admin.com')
    observableUsarioErro.subscribe(observerUsuario);

    const observableUsario = this.usuarioObservable('Admin', 'admin@admin.com')
    observableUsario.subscribe(observerUsuario);
    // Fim da chamada da Observable usuario

    // Inicio camada com unsubscaribe

    const observerUsuarioUnsubscribe = {
      next: (valor: any) => this.logStyle('NEXT: Observable Usuario Unsubscribe: ', 'dodgerblue', JSON.stringify(valor, null, 2)),
      error: (erro: any) => this.logStyle('ERRO: Observable Usuario Unsubscribe: ', 'red', erro),
      complete: () => this.logStyle('FIM: Observable Usuario Unsubscribe: ', 'yellow', ''),
    }

    setTimeout(() => {
      const observableUsarioUnsubscribe = this.usuarioObservable('Admin', 'admin@admin.com')
      const subscription = observableUsarioUnsubscribe.subscribe(observerUsuarioUnsubscribe);

      setTimeout(() => {
        subscription.unsubscribe();
        console.log('Ecerrado ', subscription.closed); 
      }, 3500);
    }, 5000);



    // Fim camada com unsubscaribe

  }
  title = 'rxjs';

  // Inicio Promise

  minhaPromise(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === 'Alice') {
        setTimeout(() => {
          resolve(`Bem vindo ${nome}`);
        }, 2000);
      }
      else {
        reject('Ops! Você não é Alice');
      }
    })
  }

  // Final Promise

  // Inicio Observable

  minhaObservable(nome: string): Observable<string> {
    return new Observable(subscriber => {
      if (nome === 'Alice') {
        subscriber.next('Olá');
        subscriber.next('Olá de Novo');
        setTimeout(() => {
          subscriber.next('Olá de Novo com delay');
        }, 2000);
        subscriber.complete();
      }
      else {
        subscriber.error('Ops! Ocorreu um erro!');
      }
    });
  }

  // Final Observable

  // Inicio Observable Usuario

  usuarioObservable(nome: string, email: string): Observable<Usuario> {
    return new Observable(subscriber => {
      if (nome === 'Admin') {
        let usuario = new Usuario(nome, email);
        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);
        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);
        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);
        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);
        setTimeout(() => {
          subscriber.complete();
        }, 5000);
      }
      else {
        subscriber.error('Ops! Ocorreu um erro!');
      }
    });
  }

  // Fim Observable Usuario

  escrever(texto: string) {
    console.log(texto);
  }

}

export class Usuario {
  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  nome: string;
  email: string;
}
