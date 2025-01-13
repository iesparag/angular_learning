import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';

const initGroceries = createAction('[Grocery] Load Grocery');
const completedGroceries = createAction('[Grocery] Load Grocery Successfull');

export const groceryAction = createActionGroup({ source: 'Grocery', events: {
    'load Groceries': emptyProps(),
    'load Groceries success': props<{payload:Grocery[]}>(),
    'load Groceries Failure': emptyProps(),
}});
