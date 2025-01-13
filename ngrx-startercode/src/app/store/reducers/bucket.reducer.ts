import { createReducer, on } from '@ngrx/store';
import { Bucket } from '../../../models/bucket.model';
import { AddToBucket, RemoveFromBucket } from '../action/bucket.action';

const initialState: Bucket[] = [
  // { id: 1, name: 'Hervey', quantity: 518, type: 'Type A' },
  // { id: 2, name: 'Birch', quantity: 95, type: 'Type C' },
  // { id: 3, name: 'Vidovic', quantity: 824, type: 'Type A' },
  // { id: 4, name: 'Lyndell', quantity: 858, type: 'Type B' },
  // { id: 5, name: 'Othelia', quantity: 900, type: 'Type B' },
  // { id: 6, name: 'Gwyn', quantity: 378, type: 'Type A' },
  // { id: 7, name: 'Winne', quantity: 330, type: 'Type B' },
  // { id: 8, name: 'Appolonia', quantity: 277, type: 'Type B' },
  // { id: 9, name: 'Bert', quantity: 631, type: 'Type B' },
  // { id: 10, name: 'Oralia', quantity: 858, type: 'Type B' },
];

export const bucketReducer = createReducer(
  initialState,
  on(AddToBucket, (state, { type, payload }): any => {
    const bucketItem = state.find((el) => el.id === payload.id);
    if (bucketItem) {
      return state.map((elem) => {
        return elem.id === payload.id
          ? { ...elem, quantity: elem.quantity + 1 }
          : elem;
      });
    } else {
      return (state = [payload, ...state]);
    }
  }),
  on(RemoveFromBucket, (state, action) => {
    const { id } = action.payload;
    const updatedState = state.map(item => {
      if (item.id === id) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null;
        }
      }
      return item;
    }).filter(item => item !== null); 
    return updatedState; 
  })
);
