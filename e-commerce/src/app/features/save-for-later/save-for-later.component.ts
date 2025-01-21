import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllSaveForLaterItems } from './state/save-for-later.selectors';
import { Observable, of } from 'rxjs';
import { SaveForLaterItem } from './state/save-for-later.state';

@Component({
  selector: 'app-save-for-later',
  imports: [],
  templateUrl: './save-for-later.component.html',
  styleUrl: './save-for-later.component.scss'
})
export class SaveForLaterComponent implements OnInit {
  SaveForLaterList$: Observable<SaveForLaterItem[]> = of([])
  store= inject(Store)
  ngOnInit(): void {
    this.store.select(selectAllSaveForLaterItems).subscribe((item)=>{
      console.log('item: save for Later ', item);

    })
    console.log('this.store.select(selectAllSaveForLaterItems): ', this.store.select(selectAllSaveForLaterItems));
  }

}
