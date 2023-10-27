import { Component, OnDestroy, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/models/models';
import { AppSelectors } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy {
  displayedColumns: string[] = ['userName', 'userId', 'phone', 'email','accountCreated','editBtn'];
  dataSource: MatTableDataSource<IUser>;
  data: IUser[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store$: Store) { 
    this.store$.select(AppSelectors.userList)
    .pipe(takeUntil(this.destroy$))
    .subscribe(users => {
      this.data = users;
      this.dataSource = new MatTableDataSource(this.data);
    })
   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
