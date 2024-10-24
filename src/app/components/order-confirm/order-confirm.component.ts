import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environments';
import { Product } from '../models/product'; // Import mô hình Product
import { OrderService } from '../../services/order.service';
import { OrderDetail } from '../models/order.detail';
import { Order } from '../models/order';
import { OrderResponse } from '../../responses/order/order.response';
@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss'],
})
export class OrderConfirmComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];
  couponCode: string = '';
  totalAmount: number = 0;

  orderResponse: OrderResponse = {
    id: 1, // Hoặc bất kỳ giá trị số nào bạn muốn
    user_id: 2,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: [], // Một mảng rỗng
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // const cart = this.cartService.getCart();
    // const productIds = Array.from(cart.keys());
    // // Gọi service để lấy danh sách sản phẩm
    // this.productService.getProductsByIds(productIds).subscribe({
    //   next: (products) => {
    //     this.cartItems = productIds.map((productId) => {
    //       const product = products.find((p) => p.id === productId);
    //       if (product) {
    //         product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
    //       }
    //       return {
    //         product: product!,
    //         quantity: cart.get(productId)!,
    //       };
    //     });
    //     console.log('Cart items:', this.cartItems); // Log để kiểm tra
    //     this.calculateTotal(); // Tính tổng sau khi lấy xong sản phẩm
    //   },
    //   error: (error: any) => {
    //     console.error('Error fetching products:', error);
    //   },
    // });
    this.getOrderDetails();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
  applyCoupon(): void {}

  getOrderDetails(): void {
    debugger;
    const orderId = 2; // Thay bằng ID của đơn hàng bạn muốn lấy.
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        debugger;
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2]
        );

        this.orderResponse.order_details = response.order_details.map(
          (order_detail: OrderDetail) => {
            order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
            return order_detail;
          }
        );
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2]
        );

        this.orderResponse.shipping_method = response.shipping_method;

        this.orderResponse.status = response.status;
        this.orderResponse.total_money = response.total_money;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      },
    });
  }
}
