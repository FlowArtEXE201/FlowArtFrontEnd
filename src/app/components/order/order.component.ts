// import { Component, OnInit } from '@angular/core';
// import { Product } from '../models/product';
// import { CartService } from '../../services/cart.service';
// import { ProductService } from '../../services/product.service';
// import { OrderService } from '../../services/order.service';
// import { TokenService } from '../../services/token.service';
// import { environment } from '../../environments/environments';
// import { OrderDTO } from '../../dtos/user/order/order.dto';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.scss'],
// })
// export class OrderComponent implements OnInit {
//   orderForm: FormGroup;
//   cartItems: { product: Product; quantity: number }[] = [];
//   totalAmount: number = 0;
//   orderData: OrderDTO = {
//     user_id: 0,
//     fullname: '',
//     email: '',
//     phone_number: '',
//     address: '',
//     note: '',
//     total_money: 0,
//     payment_method: 'cod',
//     shipping_method: 'express',
//     coupon_code: '',
//     cart_items: [],
//   };

//   constructor(
//     private cartService: CartService,
//     private productService: ProductService,
//     private orderService: OrderService,
//     private tokenService: TokenService,
//     private fb: FormBuilder,
//     private router: Router
//   ) {
//     this.orderForm = this.fb.group({
//       fullname: ['', Validators.required],
//       email: ['', [Validators.email]],
//       phone_number: ['', [Validators.required, Validators.minLength(6)]],
//       address: ['', [Validators.required, Validators.minLength(5)]],
//       note: [''],
//       shipping_method: ['express'],
//       payment_method: ['cod'],
//     });
//   }

//   ngOnInit(): void {
//     this.orderData.user_id = this.tokenService.getUserId();

//     const cart = this.cartService.getCart();
//     const productIds = Array.from(cart.keys());

//     if (productIds.length === 0) {
//       return;
//     }
//     this.productService.getProductsByIds(productIds).subscribe({
//       next: (products) => {
//         this.cartItems = productIds.map((productId) => {
//           const product = products.find((p) => p.id === productId);
//           if (product) {
//             product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
//           }
//           return {
//             product: product!,
//             quantity: cart.get(productId)!,
//           };
//         });
//       },
//       complete: () => {
//         this.calculateTotal();
//       },
//       error: (error: any) => {
//         console.error('Error fetching detail:', error);
//       },
//     });
//   }

//   placeOrder() {
//     if (this.cartItems.length === 0) {
//       alert(
//         'Không có sản phẩm nào trong giỏ hàng. Vui lòng thêm sản phẩm trước khi đặt hàng.'
//       );
//       return; // Dừng lại nếu giỏ hàng trống
//     }

//     if (this.orderForm.valid) {
//       this.orderData = {
//         ...this.orderData,
//         ...this.orderForm.value,
//       };
//       this.orderData.cart_items = this.cartItems.map((cartItem) => ({
//         product_id: cartItem.product.id,
//         quantity: cartItem.quantity,
//       }));
//       this.orderData.total_money = this.totalAmount;

//       this.orderService.placeOrder(this.orderData).subscribe({
//         next: (response) => {
//           alert('Đặt hàng thành công');
//           this.cartService.clearCart();
//           this.router.navigate(['/']);
//         },
//         complete: () => {
//           this.calculateTotal();
//         },
//         error: (error: any) => {
//           alert(`Lỗi khi đặt hàng: ${error}`);
//         },
//       });
//     } else {
//       alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
//     }
//   }

//   calculateTotal(): void {
//     this.totalAmount = this.cartItems.reduce(
//       (total, item) => total + item.product.price * item.quantity,
//       0
//     );
//   }

//   removeFromCart(index: number): void {
//     const productId = this.cartItems[index].product.id;
//     this.cartService.removeFromCart(productId);
//     this.cartItems.splice(index, 1);
//     this.calculateTotal();
//   }

//   applyCoupon(): void {}
// }
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { TokenService } from '../../services/token.service';
import { environment } from '../../environments/environments';
import { OrderDTO } from '../../dtos/user/order/order.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentDTO } from '../../dtos/user/payment.dto';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { PaymentResponse } from '../../responses/payment.response';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: { product: Product; quantity: number }[] = [];
  totalAmount: number = 0;
  orderData: OrderDTO = {
    user_id: 0,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',
    cart_items: [],
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      note: [''],
      shipping_method: ['express'],
      payment_method: ['cod'],
    });
  }

  ngOnInit(): void {
    this.orderData.user_id = this.tokenService.getUserId();

    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());

    if (productIds.length === 0) {
      return;
    }
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        this.cartItems = productIds.map((productId) => {
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!,
          };
        });
      },
      complete: () => {
        this.calculateTotal();
      },
      error: (error: any) => {
        console.error('Error fetching detail:', error);
      },
    });
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert(
        'Không có sản phẩm nào trong giỏ hàng. Vui lòng thêm sản phẩm trước khi đặt hàng.'
      );
      return; // Dừng lại nếu giỏ hàng trống
    }

    if (this.orderForm.valid) {
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value,
      };
      this.orderData.cart_items = this.cartItems.map((cartItem) => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity,
      }));
      this.orderData.total_money = this.totalAmount;

      // Gọi API để đặt hàng
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response) => {
          console.log(response);
          const orderId = response.id; // ID đơn hàng từ phản hồi
          const userId = response.user_id; // ID người dùng từ phản hồi

          if (orderId) {
            alert(`Đặt hàng thành công!`);

            // Tạo dữ liệu thanh toán
            const paymentData: PaymentDTO = {
              orderId: orderId,
              userId: userId,
            };

            // Gọi service thanh toán
            this.paymentService.postPayment(paymentData).subscribe({
              next: (paymentResponse: PaymentResponse) => {
                // Thay PaymentResponse bằng kiểu dữ liệu đúng
                // Điều hướng đến trang thanh toán với link checkoutUrl
                const checkoutUrl = paymentResponse.checkoutUrl;
                window.location.href = checkoutUrl; // Chuyển hướng đến trang thanh toán
              },
              error: (paymentError: any) => {
                // Khai báo kiểu cho paymentError
                alert(`Lỗi khi thanh toán: ${paymentError.message}`);
              },
            });

            this.cartService.clearCart(); // Xóa giỏ hàng
          } else {
            alert('Không thể tìm thấy mã đơn hàng.');
          }
        },
        complete: () => {
          this.calculateTotal();
        },
        error: (error: any) => {
          // Khai báo kiểu cho error
          alert(`Lỗi khi đặt hàng: ${error}`);
        },
      });
    } else {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  removeFromCart(index: number): void {
    const productId = this.cartItems[index].product.id;
    this.cartService.removeFromCart(productId);
    this.cartItems.splice(index, 1);
    this.calculateTotal();
  }

  applyCoupon(): void {}
}
