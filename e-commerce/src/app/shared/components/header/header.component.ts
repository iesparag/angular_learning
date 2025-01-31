import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    selectIsAuthenticated,
    selectUser,
} from '../../../features/auth/state/auth.selectors';
import { logout } from '../../../features/auth/state/auth.actions';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthState } from '../../../features/auth/state/auth.state';
import { selectCartTotalQuantity } from '../../../features/cart/state/cart.selectors';
import { getUserCart } from '../../../features/cart/state/cart.actions';
import { getUserWishlistStart } from '../../../features/wishlist/state/wishlist.actions';
import { selectWishlistTotalQuantity } from '../../../features/wishlist/state/wishlist.selectors';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatIconModule,
        RouterLink,
        FormsModule,
        CommonModule,
        MatMenuModule,
        MatButtonModule,
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    router = inject(Router);
    user$: Observable<AuthState['user']>;
    isAuthenticated$: Observable<boolean>;
    defaultAvatar =
        'https://avatars.githubusercontent.com/u/103980322?v=4&size=64';
    searchQuery: string = '';
    cartItemCount: number = 0;
    wishlistItemCount: number = 0;

    constructor(private store: Store) {
        // Subscribe to isAuthenticated selector
        this.user$ = this.store.select(selectUser);
        this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
        this.store
            .select(selectCartTotalQuantity)
            .subscribe((res) => (this.cartItemCount = res));
        this.store
            .select(selectWishlistTotalQuantity)
            .subscribe((res) => (this.wishlistItemCount = res));
    }

    ngOnInit(): void {
        this.store.dispatch(getUserCart());
        this.store.dispatch(getUserWishlistStart());
    }

    onLogout(): void {
        this.store.dispatch(logout());
    }
    onOrder() {
        this.router.navigate(['/orders']);
    }

    onSearchChange(): void {
        const currentRoute = this.router.url;
        console.log('currentRoute: ', currentRoute);

        if (this.searchQuery.trim()) {
            
            this.router.navigate(['/search'], {
                queryParams: { query: this.searchQuery },
                state: { returnUrl: currentRoute },
            });
        } else {
            console.log(history.state, 'history.state');
            const returnUrl = '/home'; 
            console.log('returnUrl: ', returnUrl);
            this.router.navigate([returnUrl]);
        }
    }
}
