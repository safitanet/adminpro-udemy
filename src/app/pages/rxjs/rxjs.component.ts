import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ],
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log('Subs ', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador terminó!')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        /*
        if (contador === 3) {
          clearInterval(contador);
          observer.complete();
        }
        */

        /*
        if (contador === 2) {
          // clearInterval(contador);
          observer.error('Auxilio!');
        }
        */


      }, 1000);
    }).pipe(
        map(resp => resp.valor),
        filter((valor, index) => {
          // console.log('Filter valor: ', valor);
          // console.log('Filter index: ', index);

          if ((valor % 2) === 1) {
            // impar
            return true;
          } else {
            return false;
          }
        })
    );
  }

}
