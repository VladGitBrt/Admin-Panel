import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppActions } from '../store/actions/app.action';
import { IUser } from '../models/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private store$: Store) { }

  loginUser(loginUserData, userList: IUser[]){
    console.log(loginUserData);
    console.log(userList);
    userList.forEach(user => {
      if(user.email == loginUserData.username && user.password == loginUserData.password){
        this.store$.dispatch(AppActions.loginUser({user}))
        this.router.navigate(['app/dashboard'])
      }
    })
  }

  registerUser(registerUserData){
   this.store$.dispatch(AppActions.registerUser(registerUserData))
   this.router.navigate(["app/dashboard"]);
  }
}
