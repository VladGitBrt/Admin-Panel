import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedMaterialModuleModule } from '../shared-material-module/shared-material-module.module';
import { ProductsComponent } from './components/products.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedMaterialModuleModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
