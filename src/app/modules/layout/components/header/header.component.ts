import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from 'src/app/store/actions/app.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private store$: Store) { }

  logOut():void{
    this.store$.dispatch(AppActions.logOut())
  }
}
