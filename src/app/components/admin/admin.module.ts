import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './order/order.admin.component';
import { DetailOrderAdminComponent } from './detail-order/detail.order.admin.component';
import { ProductAdminComponent } from './product/product.admin.component';
import { CategoryAdminComponent } from './category/category.admin.component';
import { FormsModule } from '@angular/forms'; // Thêm dòng này

@NgModule({
  declarations: [
    AdminComponent,
    OrderAdminComponent,
    DetailOrderAdminComponent,
    ProductAdminComponent,
    CategoryAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule, // Đảm bảo RouterModule được thêm vào đây
    FormsModule, // Thêm dòng này vào imports
  ],
})
export class AdminModule {}
