import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { GroceryService } from '../../grocery.service';
import { groceryAction } from '../action/grocries.action';

@Injectable()
export class GroceryEffects {
  private actions$ = inject(Actions);
  private groceryService = inject(GroceryService);

  loadGroceries$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(groceryAction.loadGroceries), //ofType is an RxJS operator that filters actions based on their type.
        // ofType(groceryAction.loadGroceries) checks the action type directly, so you don't need () here. It isn't a function call; instead, you're passing the action type.
        exhaustMap(() => this.groceryService.fetchAllGroceries()
          .pipe(
            map((groceries:any) => (groceryAction.loadGroceriesSuccess({payload:groceries}))),
            catchError(() => of(groceryAction.loadGroceriesFailure()))
          ))
    );
    
  });
}