import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environments'; // Đường dẫn tới file environment
import { Product } from '../models/product'; // Mô hình Product
import { ProductService } from '../../services/product.service'; // Service lấy dữ liệu sản phẩm
import { CategoryService } from '../../services/category.service'; // Service lấy dữ liệu danh mục
import { Category } from '../models/category';
import { Router } from '@angular/router'; // Import Router để điều hướng
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quantity: number = 1; // Khai báo biến quantity
  product?: Product;
  products: Product[] = []; // Mảng chứa các sản phẩm
  currentPage: number = 0; // Trang hiện tại
  itemsPerPage: number = 9; // Số lượng sản phẩm trên mỗi trang
  totalPages: number = 0; // Tổng số trang
  visiblePages: number[] = []; // Mảng chứa các trang hiện đang hiển thị
  keyword: string = ''; // Từ khóa tìm kiếm
  categories: Category[] = []; // Mảng chứa các danh mục sản phẩm
  selectedCategoryId: number = 0; // ID danh mục sản phẩm

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router, // Thêm Router vào constructor
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Gọi phương thức để lấy dữ liệu sản phẩm khi trang được khởi tạo
    this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
    this.getCategories(0, 100);
  }

  getCategories(page: number, limit: number): void {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        console.log('Categories fetched:', categories);
        this.categories = categories; // Gán dữ liệu vào biến categories
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  searchProduct(): void {
    this.currentPage = 0;
    this.itemsPerPage = 9;

    this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
  }

  // Phương thức để lấy sản phẩm từ API
  getProducts(
    keyword: string,
    selectedCategoryId: number,
    page: number,
    limit: number
  ): void {
    this.productService
      .getProducts(keyword, selectedCategoryId, page, limit)
      .subscribe({
        next: (response: any) => {
          response.products.forEach((product: Product) => {
            product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          });
          this.products = response.products; // Gán sản phẩm vào mảng products
          this.totalPages = response.totalPages; // Gán tổng số trang từ API
          this.visiblePages = this.generateVisiblePageArray(
            this.currentPage,
            this.totalPages
          ); // Tạo mảng các trang hiển thị
        },
        error: (error: any) => {
          console.error('Error fetching products:', error); // Xử lý lỗi nếu có
        },
      });
  }

  // Phương thức thay đổi trang
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    ); // Lấy sản phẩm cho trang mới
  }

  // Phương thức tạo mảng các trang hiển thị
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  }

  // Sửa lỗi onProductClick để điều hướng tới chi tiết sản phẩm
  onProductClick(productId: number): void {
    this.router.navigate(['/products', productId]); // Điều hướng tới trang chi tiết sản phẩm
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
    } else {
      console.error('không thể thêm sản phẩm vào giỏ hàng vì product là null');
    }
  }
}
