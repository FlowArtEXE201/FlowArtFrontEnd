import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../models/product'; // Import mô hình sản phẩm

@Component({
  selector: 'app-product-admin',
  templateUrl: './product.admin.component.html',
  styleUrls: ['./product.admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
  products: Product[] = []; // Mảng chứa danh sách sản phẩm
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = '';
  visiblePages: number[] = [];

  constructor(
    private router: Router,
    private productService: ProductService // Dịch vụ lấy sản phẩm
  ) {}

  ngOnInit(): void {
    this.getAllProducts(this.keyword, this.currentPage, this.itemsPerPage);
  }

  getAllProducts(keyword: string, page: number, limit: number) {
    this.productService.getAllProducts(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.products = response.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          categoryId: product.category_id,
          created_at: product.created_at,
          updated_at: product.updated_at,
          // Không lấy trường hình ảnh
        }));
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totalPages
        );
      },
      complete: () => {
        console.log('Products loaded successfully.');
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllProducts(this.keyword, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 0);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 0);
    }

    return new Array(endPage - startPage + 1)
      .fill(0)
      .map((_, index) => startPage + index);
  }

  viewDetails(product: Product) {
    this.router.navigate(['/admin/products', product.id]); // Điều hướng đến trang chi tiết sản phẩm
  }
}
