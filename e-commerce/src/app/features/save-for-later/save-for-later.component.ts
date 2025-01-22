import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllSaveForLaterItems } from './state/save-for-later.selectors';
import { Observable, of } from 'rxjs';
import { saveForLaterProduct } from './state/save-for-later.state';
import { getUserSaveForLaterStart } from './state/save-for-later.actions';

@Component({
  selector: 'app-save-for-later',
  imports: [],
  templateUrl: './save-for-later.component.html',
  styleUrl: './save-for-later.component.scss'
})
export class SaveForLaterComponent implements OnInit {
  SaveForLaterList$: Observable<saveForLaterProduct[]> = of([])
  store= inject(Store)
  ngOnInit(): void {
    this.store.dispatch(getUserSaveForLaterStart())
    this.store.select(selectAllSaveForLaterItems).subscribe((item)=>{
console.log(item,"88888888888888888888888888888888888888888888888")
    })
  }

}
