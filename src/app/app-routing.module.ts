// import { NgModule, importProvidersFrom } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { HomeComponent } from './components/home/home.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { DetailProductComponent } from './components/detail-product/detail-product.component';
// import { OrderComponent } from './components/order/order.component';
// import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
// import { AuthGuardFn } from './components/guards/auth.guard';
// import { UserProfileComponent } from './components/user-profile/user-profile.component';
// import { AdminComponent } from './components/admin/admin.component';
// import { AdminGuardFn } from './components/guards/admin.guard';
// import { UserGuard } from './components/guards/user.guard';
// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'admin', component: AdminComponent, canActivate: [AdminGuardFn] },

//   {
//     path: 'products/:id',
//     component: DetailProductComponent,
//     canActivate: [AuthGuardFn],
//   },
//   { path: 'orders', component: OrderComponent, canActivate: [AuthGuardFn] },

//   {
//     path: 'user-profile',
//     component: UserProfileComponent,
//     canActivate: [AuthGuardFn],
//   },
//   {
//     path: 'orders/:id',
//     component: OrderConfirmComponent,
//     canActivate: [AuthGuardFn],
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { AuthGuardFn } from './components/guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuardFn } from './components/guards/admin.guard';
import { UserGuardFn } from './components/guards/user.guard'; // Import UserGuard

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent }, // Thêm route cho /home

  // Route admin, chỉ cho phép admin truy cập
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuardFn] },

  // Route cho các sản phẩm, chỉ cho phép người dùng đã xác thực
  {
    path: 'products/:id',
    component: DetailProductComponent,
    canActivate: [UserGuardFn],
  },

  // Route cho đơn hàng, chỉ cho phép người dùng đã xác thực
  { path: 'orders', component: OrderComponent, canActivate: [UserGuardFn] },

  // Route cho trang hồ sơ người dùng, chỉ cho phép người dùng đã xác thực
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [UserGuardFn], // Chỉ cho phép user vào
  },

  // Route cho xác nhận đơn hàng, chỉ cho phép người dùng đã xác thực
  {
    path: 'orders/:id',
    component: OrderConfirmComponent,
    canActivate: [UserGuardFn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
