import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/user-component/users.component';
import { UserUpdateComponent } from './components/user-form/user-form.component';


const routes: Routes = [
  {path:"", component: UsersComponent},
  {path:"update/:id", component: UserUpdateComponent},
  {path:'add-user', component: UserUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
