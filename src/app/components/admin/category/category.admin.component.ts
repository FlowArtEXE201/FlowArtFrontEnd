// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-category-admin',
//   templateUrl: './category.admin.component.html',
//   styleUrls: ['./category.admin.component.scss'],
// })
// export class CategoryAdminComponent implements OnInit {
//   constructor(private router: Router) {}
//   ngOnInit() {}
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { CategoryResponse } from '../../../responses/category/category.response';
import { Category } from '../../models/category';
@Component({
  selector: 'app-category-admin',
  templateUrl: './category.admin.component.html',
  styleUrls: ['./category.admin.component.scss'],
})
export class CategoryAdminComponent implements OnInit {
  categories: CategoryResponse[] = [];
  currentPage: number = 1; // Bắt đầu từ trang 1
  itemsPerPage: number = 10; // Số mục mỗi trang
  totalPages: number = 0;
  keyword: string = '';
  visiblePages: number[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories(this.currentPage, this.itemsPerPage);
  }

  getAllCategories(page: number, limit: number) {
    this.categoryService.getAllCategories(page, limit, this.keyword).subscribe({
      next: (response: any) => {
        console.log(response); // Kiểm tra phản hồi từ API
        this.categories = response.categories || []; // Điều chỉnh nếu phản hồi không có trường này
        this.categories = response; // Gán đúng dữ liệu vào categories
        this.totalPages = response.totalPages || 0; // Điều chỉnh nếu phản hồi không có trường này
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totalPages
        );
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllCategories(this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    // Kiểm tra xem totalPages có hợp lệ không
    if (totalPages <= 0) {
      return []; // Trả về mảng rỗng nếu không có trang nào
    }

    let startPage = Math.max(currentPage - halfVisiblePages, 0);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

    // Nếu số trang visible không đủ, điều chỉnh startPage
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 0);
    }

    // Kiểm tra lại chiều dài mảng trước khi tạo
    const length = endPage - startPage + 1;
    if (length < 0) {
      return []; // Trả về mảng rỗng nếu length không hợp lệ
    }

    return new Array(length).fill(0).map((_, index) => startPage + index);
  }

  updateCategory(category: CategoryResponse): void {
    const updatedCategory: Category = {
      id: category.id, // Thêm id
      name: category.name,
    };

    this.categoryService
      .updateCategory(category.id, updatedCategory)
      .subscribe({
        next: (response: any) => {
          console.log('Category updated successfully:', response);
          this.getAllCategories(this.currentPage, this.itemsPerPage); // Làm mới danh sách sau khi cập nhật
        },
        error: (error: any) => {
          console.error('Error updating category:', error);
        },
      });
  }
}
