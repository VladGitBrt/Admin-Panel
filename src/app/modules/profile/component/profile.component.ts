import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppActions } from 'src/app/store/actions/app.action';
import { INotifications, IUser } from 'src/app/models/models';
import { AppSelectors } from 'src/app/store/selectors/app.selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  notificationForm: FormGroup;
  currentUser: IUser;
  notifications: INotifications;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store$: Store, private _snackBar: MatSnackBar) {
    this.store$.select(AppSelectors.currentUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe(user => this.currentUser = user);
    
    this.store$.select(AppSelectors.currentNotification)
    .pipe(takeUntil(this.destroy$))
    .subscribe(notifications => this.notifications = notifications);
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.currentUser.firstName, Validators.required),
      lastName: new FormControl(this.currentUser.lastName, Validators.required),
      email: new FormControl(this.currentUser.email, [Validators.email,Validators.required]),
      phone: new FormControl(this.currentUser.phone, Validators.required),
      country: new FormControl(this.currentUser.country,Validators.required),
      city: new FormControl(this.currentUser.city,Validators.required)
    })
    this.notificationForm = new FormGroup({
      notificationsEmail: new FormControl(this.notifications.notificationsEmail),
      notificationsPush: new FormControl(this.notifications.notificationsPush),
      notificationsText: new FormControl(this.notifications.notificationsText),
      notificationsPhone: new FormControl(this.notifications.notificationsPhone),
      messagesEmail: new FormControl(this.notifications.messagesEmail),
      messagesPush: new FormControl(this.notifications.messagesPush),
      messagesText: new FormControl(this.notifications.messagesText),
    })
    
  }

  profileEdit():void{
    this.store$.dispatch(AppActions.editUserInfo(this.editForm.value))
    this._snackBar.open('Profile has been updated!', 'Done',{
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
  
  notificationsSettings():void{
    this.store$.dispatch(AppActions.editNotifications(this.notificationForm.value));
    this._snackBar.open('Notifications has been saved!', 'Done',{
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  userPhotoUpdate(image):void{
    this.store$.dispatch(AppActions.changeAvatar({imgPath: image[0].name}))
    this._snackBar.open('User picture successfully updated!', 'Done',{
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  removeAvatar():void{
    this.store$.dispatch(AppActions.removeAvatar());
    this._snackBar.open('User picture successfully deleted!', 'Done',{
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
