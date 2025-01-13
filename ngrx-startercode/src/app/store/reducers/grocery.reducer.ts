import { createReducer, on } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';
import { groceryAction } from '../action/grocries.action';

const initialState: Grocery[] = [
  // { id: 62, name: 'Sheena', type: 'fruit' },
  // { id: 87, name: 'Rip', type: 'fruit' },
  // { id: 89, name: 'Nerti', type: 'fruit' },
  // { id: 31, name: 'Montague', type: 'fruit' },
  // { id: 14, name: 'Anet', type: 'snacks' },
  // { id: 43, name: 'Katrina', type: 'snacks' },
  // { id: 70, name: 'Tobi', type: 'snacks' },
  // { id: 29, name: 'Jeremiah', type: 'snacks' },
  // { id: 60, name: 'Georgena', type: 'snacks' },
];

export const groceryReducer = createReducer(
  initialState,
  on(groceryAction.loadGroceriesSuccess, (state, action) => {
    return action.payload;
  }),
  on(groceryAction.loadGroceriesFailure, (state, action) => {
    return [];
  }),

);
