import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '../../../features/products/state/product.state';
import { CommonModule } from '@angular/common';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Store } from '@ngrx/store';
import {
  addToCart,
  updateProductQuantity,
} from '../../../features/cart/state/cart.actions';
import { selectUser } from '../../../features/auth/state/auth.selectors';
import { Observable, of } from 'rxjs';
import { AuthState } from '../../../features/auth/state/auth.state';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-product-common-card',
  imports: [CommonModule],
  templateUrl: './product-common-card.component.html',
  styleUrls: ['./product-common-card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCommonCardComponent {
  @Input() product!: Product;
  store = inject(Store);


  quantity: number = 1;
  isFavorite: boolean = false;

  // Swiper configuration
  galleryConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: true,
    pagination: { clickable: true },
  };

  // // Increase Quantity
  // increaseQuantity() {
  //   this.quantity++;
  //   this.store.dispatch(
  //     updateProductQuantity({
  //       productId: this.product._id,
  //       quantity: this.quantity,
  //     })
  //   );
  // }

  // // Decrease Quantity
  // decreaseQuantity() {
  //   if (this.quantity > 1) {
  //     this.quantity--;
  //     this.store.dispatch(
  //       updateProductQuantity({
  //         productId: this.product._id,
  //         quantity: this.quantity,
  //       })
  //     );
  //   }
  // }

  // Toggle Favorite
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  // Add to Cart
  addToCart() {
    console.log('Added to Cart:', this.product, 'Quantity:', this.quantity);
    this.store.dispatch(
      addToCart({ productId: this.product._id, quantity: this.quantity })
    );
  }

  // // Buy Now
  // buyNow() {
  //   console.log('Buy Now:', this.product, 'Quantity:', this.quantity);
  // }
}
