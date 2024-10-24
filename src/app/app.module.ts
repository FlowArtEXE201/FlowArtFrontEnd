import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component'; // Đường dẫn tới file header.component.ts
import { FooterComponent } from './components/footer/footer.component'; // Đường dẫn tới file footer.component.ts
import { DetailProductComponent } from './components/detail-product/detail-product.component'; // Thêm import này
import { OrderComponent } from './components/order/order.component'; // Import the component
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { LoginComponent } from './components/login/login.component'; // Đường dẫn đến LoginComponent
import { RegisterComponent } from './components/register/register.component'; // Đường dẫn đến RegisterComponent
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Nhập HttpClientModule
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module'; // Đảm bảo import AppRoutingModule
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

// import { OrderAdminComponent } from './components/admin/order/order.admin.component';
// import { ProductAdminComponent } from './components/admin/product/product.admin.component';
// import { CategoryAdminComponent } from './components/admin/category/category.admin.component';
// import { AdminComponent } from './components/admin/admin.component';
import { AdminModule } from './components/admin/admin.module'; // Import AdminModule

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent, // Thêm vào declarations
    FooterComponent, // Thêm vào declarations
    DetailProductComponent,
    OrderComponent,
    OrderConfirmComponent,
    LoginComponent, // Thêm vào đây
    RegisterComponent, // Thêm RegisterComponent vào đây
    AppComponent,
    UserProfileComponent,
    // OrderAdminComponent,
    // ProductAdminComponent,
    // CategoryAdminComponent,
    // AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Thêm HttpClientModule vào imports
    AppRoutingModule, // Thêm AppRoutingModule vào imports
    NgbModule,
    AdminModule, // Đảm bảo AdminModule được thêm vào đây
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
