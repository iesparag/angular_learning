import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { wishlistProduct } from './state/wishlist.state';
import { getUserWishlistStart } from './state/wishlist.actions';
import { selectAllWishlistItems } from './state/wishlist.selectors';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  store = inject(Store)
  wishlistList$:Observable<wishlistProduct[]> = of([])
  ngOnInit(): void {
   this.store.dispatch(getUserWishlistStart())
   this.wishlistList$ = this.store.select(selectAllWishlistItems)
   this.wishlistList$.subscribe((item)=> console.log(item,"wishlist"))
 }
}
