import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/components/layout/layout.component';

const routes: Routes = [
  {path: "", pathMatch: "full",redirectTo:"/auth/login"},
  {path: "auth", loadChildren: ()=> import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  {path: "app", component: LayoutComponent, children: [
    {path: "dashboard", loadChildren: ()=> import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule) },
    {path: "users", loadChildren: ()=> import('./modules/users/users.module').then(m=>m.UsersModule)},
    {path: "profile", loadChildren: ()=> import('./modules/profile/profile.module').then(m=>m.ProfileModule)},
    {path: "products", loadChildren: ()=> import('./modules/products/products.module').then(m=>m.ProductsModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
