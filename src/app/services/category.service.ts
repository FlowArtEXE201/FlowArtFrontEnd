// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environments';
// import { Category } from '../components/models/category';

// @Injectable({
//   providedIn: 'root',
// })
// export class CategoryService {
//   private apiGetCategories = `${environment.apiBaseUrl}/categories`;

//   constructor(private http: HttpClient) {}

//   // Lấy danh sách categories với phân trang và từ khóa
//   getCategories(
//     page: number,
//     limit: number,
//     keyword: string = ''
//   ): Observable<Category[]> {
//     let params = new HttpParams()
//       .set('page', page.toString())
//       .set('limit', limit.toString());

//     // Nếu keyword có giá trị thì thêm vào tham số
//     if (keyword) {
//       params = params.set('keyword', keyword);
//     }

//     return this.http.get<Category[]>(this.apiGetCategories, { params });
//   }

//   // Lấy danh sách tất cả categories (không phân trang)
//   getAllCategories(): Observable<Category[]> {
//     return this.http.get<Category[]>(this.apiGetCategories);
//   }

// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Category } from '../components/models/category';
import { CategoryResponse } from '../responses/category/category.response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiGetCategories = `${environment.apiBaseUrl}/categories`;
  private apiCategory = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(
    page: number,
    limit: number,
    keyword: string = ''
  ): Observable<Category[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (keyword) {
      params = params.set('keyword', keyword);
    }

    return this.http.get<Category[]>(this.apiGetCategories, { params });
  }

  getAllCategories(
    page: number,
    limit: number,
    keyword: string = ''
  ): Observable<Category[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    // Nếu keyword có giá trị thì thêm vào tham số
    if (keyword) {
      params = params.set('keyword', keyword);
    }

    return this.http.get<Category[]>(this.apiGetCategories, { params });
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiCategory, category);
  }

  updateCategory(id: number, category: Category): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(
      `${this.apiCategory}/${id}`,
      category
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiCategory}/${id}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiCategory}/${id}`);
  }
}
