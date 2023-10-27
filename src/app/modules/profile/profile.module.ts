import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './component/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModuleModule } from '../shared-material-module/shared-material-module.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedMaterialModuleModule,
    NgxMaskModule.forRoot()
  ]
})
export class ProfileModule { }
