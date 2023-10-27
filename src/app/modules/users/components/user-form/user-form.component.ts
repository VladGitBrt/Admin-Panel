import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/models/models';
import { AppSelectors } from 'src/app/store/selectors/app.selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppActions } from 'src/app/store/actions/app.action';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  userId: string;
  form: FormGroup;
  updatedUser: IUser;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private store$: Store) { };

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      nickname: new FormControl('',[Validators.required, Validators.minLength(6)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('',[Validators.required]),
      userId: new FormControl(''),
      country: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required)
    })

    this.route.params
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => {
      this.userId = params['id'];
      this.getUser()
    })
  }

  editUser(){
    this.store$.dispatch(AppActions.editUser(this.form.value))
  }

  getUser(){
    this.store$.select(AppSelectors.userList)
    .pipe(takeUntil(this.destroy$))
    .subscribe(list => {
      list.forEach(user => {
        if(user.userId === this.userId){
          this.updatedUser = user;
          this.form.patchValue({
            firstName: this.updatedUser.firstName,
            lastName:this.updatedUser.lastName,
            nickname: this.updatedUser.nickname,
            email: this.updatedUser.email,
            phone: this.updatedUser.phone,
            userId: this.updatedUser.userId,
            country: this.updatedUser.country,
            city: this.updatedUser.city
          })
        }
      })
    })
  }

  submitForm():void {
    if(this.form.valid) {
      if(this.userId){
        this.editUser()
      }
      else{
        this.addUser()
      }
    }
  }

  addUser(){
    this.store$.dispatch(AppActions.addUser(this.form.value))
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
