import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environments';
import { Product } from '../models/product';
import { ProductImage } from '../models/productImage';
import { CartService } from '../../services/cart.service'; // Đảm bảo import đúng
import { Router, ActivatedRoute } from '@angular/router'; // Thêm Router và ActivatedRoute

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1; // Khai báo biến quantity

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute, // Thêm ActivatedRoute
    private router: Router // Thêm Router
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.productId = +idParam; // Chuyển đổi sang kiểu số
    }

    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          if (response.productImages && response.productImages.length > 0) {
            response.productImages.forEach((productImage: ProductImage) => {
              productImage.imageUrl = `${environment.apiBaseUrl}/products/images/${productImage.imageUrl}`;
            });
          }

          this.product = response; // Cập nhật sản phẩm
          this.showImage(0); // Hiển thị hình ảnh đầu tiên
        },
        error: (error: any) => {
          console.error('Error fetching product details', error);
        },
      });
    } else {
      console.error('Invalid productId', idParam);
    }
  }

  showImage(index: number): void {
    if (
      this.product &&
      this.product.productImages &&
      this.product.productImages.length > 0
    ) {
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.productImages.length) {
        index = this.product.productImages.length - 1;
      }
      this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number): void {
    this.currentImageIndex = index;
  }

  nextImage(): void {
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void {
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
    } else {
      console.error('không thể thêm sản phẩm vào giỏ hàng vì product là null');
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  buyNow(): void {
    this.router.navigate(['/orders']); // Điều hướng đến trang đơn hàng
  }
}
