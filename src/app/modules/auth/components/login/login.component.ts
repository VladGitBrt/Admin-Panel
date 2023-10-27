import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/custom-validators';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/models/models';
import { Store } from '@ngrx/store';
import { AppSelectors } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  successLogin: boolean = true;
  loginForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userList: IUser[];
  constructor(private authService: AuthService, private store$: Store) { 
    this.store$.select(AppSelectors.userList)
    .pipe(takeUntil(this.destroy$))
    .subscribe(userList => {
      this.userList = userList;
    });
   }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("user@mail.com",Validators.minLength(6)),
      password: new FormControl("Cardlord231202!",[
        Validators.required,
        CustomValidators.patternValidator(/[a-zA-Z]/,{noAlphabeticCharacters:true}),
        CustomValidators.patternValidator(/[0-9]/,{noNumericCharacters: true}),
        CustomValidators.patternValidator(/[!@\$%\^\&*\)\(+=._-]/,{noSpecialCharacters:true}),
        Validators.minLength(8)
      ])
    })
  }

  loginUser(){
    if(this.loginForm.valid){
      this.authService.loginUser(this.loginForm.value, this.userList)
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
