import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/components/register/register.component';
import { SharedMaterialModuleModule } from '../shared-material-module/shared-material-module.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedMaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[AuthService]
})
export class AuthModule { }
