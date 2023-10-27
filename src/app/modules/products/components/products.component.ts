import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IProductList } from 'src/app/models/models';
import { AppSelectors } from 'src/app/store/selectors/app.selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProductList[];
  productList: IProductList[];
  liveSearchCounter = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchInput: FormControl;

  constructor(private store$: Store) { 
    this.store$.select(AppSelectors.state)
    .pipe(takeUntil(this.destroy$))
    .subscribe((state)=>{
      this.products = state.products;   
      this.productList = state.products;   
    })
  }

  ngOnInit(): void {
    this.searchInput = new FormControl('');
  }

  onInputChange():void{
    this.products = this.productList ? this.productList.filter(item => {
      item.title.search(new RegExp(this.searchInput.value, 'i')) > -1
    }) : [];
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
