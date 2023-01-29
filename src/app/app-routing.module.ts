import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./components/chat/chat.component";
import {AuthenticationComponent} from "./core/authentication/authentication.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {DashboardComponent} from "./core/dashboard/dashboard.component";
import {MProductsComponent} from "./components/m-products/m-products.component";
import {MOrdersComponent} from "./components/m-orders/m-orders.component";
import {MCartComponent} from "./components/m-cart/m-cart.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: AuthenticationComponent},
  {path:'dashboard',component:DashboardComponent,children:[
      {path:'',component:HomePageComponent},
      {path: 'products', component: MProductsComponent},
      {path: 'cart', component: MCartComponent},
      {path: 'orders', component: MOrdersComponent},
      {path: 'chat', component: ChatComponent}
    ]},
  { path: 'shared', loadChildren: () => import('./core/shared/shared.module').then(m => m.SharedModule) },
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
