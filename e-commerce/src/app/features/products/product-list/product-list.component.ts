import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store';
import { loadProducts } from '../state/product.actions';
import { selectProducts } from '../state/product.selectors';
import { Product } from '../state/product.state';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductListComponent implements OnInit  {
 activatedRouter = inject(ActivatedRoute)
 store = inject(Store)
categoryId: string | null = null
 productList$: Observable<Product[]> = of([]);

ngOnInit(): void {
  this.activatedRouter.queryParams.subscribe((elem:any)=> this.categoryId = elem?.categoryId);
  console.log('categoryId: ', this.categoryId);
  this.onGetAllProducts()
  this.productList$ = this.store.select(selectProducts)
  this.productList$.subscribe((products) => {
    console.log('Products: ', products);
  });

 }

 onGetAllProducts(){
  this.store.dispatch(loadProducts({ categoryId: this.categoryId }));

 }
}
