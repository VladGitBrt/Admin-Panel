import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/user-component/users.component'
import { SharedMaterialModuleModule } from '../shared-material-module/shared-material-module.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { UserUpdateComponent } from './components/user-form/user-form.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [UsersComponent, UserUpdateComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedMaterialModuleModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class UsersModule {}
