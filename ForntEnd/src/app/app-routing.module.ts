import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ErrorComponent } from './components/error/error.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { authenticationGuard } from './guards/authentication.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProfileInfoComponent } from './components/ProfileInfo/profile-info.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'category/:id', component: ProductsComponent},
  { path: 'cart/:id',canActivate: [authenticationGuard], component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'cart',canActivate: [authenticationGuard], component: CartComponent },
  { path: 'order',canActivate: [authenticationGuard], component: CheckOutComponent },
  { path: 'checkout',canActivate: [authenticationGuard], component: CheckOutComponent },
  { path: 'products/Details/:id', component: ProductDetailsComponent },
  { path: 'wishList',canActivate: [authenticationGuard], component: WishListComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'orderDetails', component: OrderDetailsComponent },
  { path: 'changePassword',canActivate: [authenticationGuard], component: ResetPasswordComponent },

  // =====================================

  {
    path: 'profile',
    canActivate: [authenticationGuard],
    component: ProfileComponent,
  },
  {
    path: 'profileInfo',
    canActivate: [authenticationGuard],
    component: ProfileInfoComponent,
  },
  // {
  //   path: 'authentication',
  //   loadChildren: () =>
  //     import('./authentication/authentication.module').then(
  //       (m) => m.AuthenticationModule
  //     ),
  // },
  // =====================================
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, NgxSpinnerModule],
})
export class AppRoutingModule {}
