import { Component, inject, OnInit } from '@angular/core';
import { CartItem } from './state/cart.state';
import { Store } from '@ngrx/store';
import { getUserCart } from './state/cart.actions';
import { Observable, of } from 'rxjs';
import { selectAllCartItems } from './state/cart.selectors';
import { CartCommonCardComponent } from '../../shared/components/cart-common-card/cart-common-card.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SaveForLaterComponent } from '../save-for-later/save-for-later.component';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";
// import { PaymentComponent } from "../payment/payment.component";

@Component({
    selector: 'app-cart',
    imports: [
    CartCommonCardComponent,
    AsyncPipe,
    CommonModule,
    RouterLink,
    SaveForLaterComponent,
    EmptyStateComponent,
    // PaymentComponent
],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
    userCartList$: Observable<CartItem[]> = of([]);
    totalAmount: number = 0;
    store = inject(Store);
    ngOnInit(): void {
        this.getUserCart();
        this.userCartList$ = this.store.select(selectAllCartItems);
        this.userCartList$.subscribe((cartItems) => {
            this.totalAmount = this.calculateTotalAmount(cartItems);
        });
    }

    getUserCart() {
        this.store.dispatch(getUserCart());
    }

    calculateTotalAmount(cartItems: CartItem[]): number {
        return cartItems.reduce((sum, item) => {
            return sum + item.product.price * item.quantity;
        }, 0); // Start sum at 0
    }
}
