import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LeftSidedNavBarComponent } from './core/dashboard/components/left-sided-nav-bar/left-sided-nav-bar.component';
import { TopBarComponent } from './core/dashboard/components/top-bar/top-bar.component';
import { ApprovalDialogComponent } from './core/dialogs/approval-dialog/approval-dialog.component';
import { ChatComponent } from './components/chat/chat.component';
import { MenuContainerComponent } from './core/dashboard/components/left-sided-nav-bar/components/menu-container/menu-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import { MProductsComponent } from './components/m-products/m-products.component';
import { MOrdersComponent } from './components/m-orders/m-orders.component';
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SharedModule} from "./core/shared/shared.module";
import { ItemDetailsComponent } from './components/m-products/components/item-details/item-details.component';
import {CookieModule} from "ngx-cookie";
import {MatTableModule} from "@angular/material/table";
import { MCartComponent } from './components/m-cart/m-cart.component';
import { CartDetailsComponent } from './components/m-cart/componenets/cart-details/cart-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AuthenticationComponent,
    DashboardComponent,
    LeftSidedNavBarComponent,
    TopBarComponent,
    ApprovalDialogComponent,
    ChatComponent,
    MenuContainerComponent,
    MProductsComponent,
    MOrdersComponent,
    ItemDetailsComponent,
    MCartComponent,
    CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    CookieModule.forRoot(),
    MatTableModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
