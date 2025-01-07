import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  debounceTime,
  filter,
  fromEvent,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
  // shareReplay
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('search', { static: true }) search: any;
  users:any = [];
  ngOnInit(): void {
    const searchObj = fromEvent(this.search.nativeElement, 'input').pipe(
      filter((e: any) => e.target.value !== ''),
      debounceTime(3000),
      switchMap((e: any) => {
        return ajax(`https://api.github.com/search/users?q=${e.target.value}`);
      })
    );
    searchObj.subscribe((res: any) => {
      this.users = res.response.items
    });

    //observable=> if any line return Observable that means it is emitting some data.
    const pizzaObservable = new Observable((subscriber) => {
      console.log("papa ki pari")
      subscriber.next({ size: 'small', name: 'jalepino pizza', veg: true });
      subscriber.next({ size: 'small', name: 'Margherita pizza', veg: true });
      subscriber.next({
        size: 'large',
        name: 'fully loaded pizza',
        veg: false,
      });
      // subscriber.complete()
    }).pipe(
      // ---------**** Tap is Used to debug and perform some other operation  ****----------
      // tap((pizza:any)=>{
          // if(pizza.size === "large"){
          //   throw new Error("large size not available now")
          // }
      // }),
      filter((pizza: any) => pizza.veg == true),
      map((elem: any) => {
        return { orderedBy: 'Parag Jain', ...elem };
      }),
      // shareReplay()
    );

    // Subscriber/observer =>  who comsume that emited data.
    pizzaObservable
      .subscribe({
        next: (res) => {
          console.log(res, 'subscribe ka hai ');
        },
        error: (err) => {
          console.log(err.message);
        },
        complete: () => {
          console.log('I am done with a Pizza');
        },
      });

    // pizzaObservable
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res, 'subscribe ka hai ');
    //     },
    //     error: (err) => {
    //       console.log(err.message);
    //     },
    //     complete: () => {
    //       console.log('I am done with a Pizza');
    //     },
    //   });
  }
}
