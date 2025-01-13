import { Component, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../../models/grocery.model';
import {  AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AddToBucket, RemoveFromBucket } from '../../store/action/bucket.action';
import { selectGroceries, selectGroceryByType } from '../../store/selectors/grocery.selectors';


@Component({
    selector: 'app-grocery',
    imports: [CommonModule, AsyncPipe],
    standalone:true,
    templateUrl: './grocery.component.html',
    styleUrl: './grocery.component.css'
})
export class GroceryComponent {

  groceries$?:Observable<Grocery[]>;

  constructor(private store:Store<{groceries: Grocery[]}>){
    this.groceries$ = this.store.select(selectGroceryByType("fruit"))
  }



  onTypeChange(event: Event){
    const selectedValue = (event?.target as HTMLSelectElement).value
    this.groceries$ = this.store.select(selectGroceryByType(selectedValue))

  }


  increment(item:Grocery){
    const payload = {
      id:item.id,
      name:item.name,
      quantity:1,
      type : item.type
    }

     this.store.dispatch(AddToBucket({payload}))
  }
  decrement(item:Grocery){
    const payload = {
      id:item.id,
    }
    this.store.dispatch(RemoveFromBucket({payload}))
  }
}
