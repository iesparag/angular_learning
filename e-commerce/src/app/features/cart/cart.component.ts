import { Component, inject, OnInit } from '@angular/core';
import { CartItem } from './state/cart.state';
import { Store } from '@ngrx/store';
import { getUserCart } from './state/cart.actions';
import { Observable, of } from 'rxjs';
import { selectAllCartItems } from './state/cart.selectors';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  userCartList$: Observable<CartItem[]> = of([]);
  store = inject(Store);
  ngOnInit(): void {
    this.getUserCart();
     this.userCartList$ = this.store.select(selectAllCartItems)
    this.userCartList$.subscribe((elem)=> console.log(elem));
  }

  getUserCart() {
   this.store.dispatch(getUserCart());
  }
}
