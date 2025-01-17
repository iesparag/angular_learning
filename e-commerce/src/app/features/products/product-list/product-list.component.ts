import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store';
import { loadProducts } from '../state/product.actions';
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

ngOnInit(): void {
  this.activatedRouter.queryParams.subscribe((elem:any)=> this.categoryId = elem?.categoryId);
  console.log('categoryId: ', this.categoryId);
  this.onGetAllProducts()
 }

 onGetAllProducts(){
  this.store.dispatch(loadProducts())
 }
}
