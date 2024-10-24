// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environments';
// import { Product } from '../components/models/product';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductService {
//   private apiGetProducts = `${environment.apiBaseUrl}/products`;

//   constructor(private http: HttpClient) {}

//   getProducts(
//     keyword: string,
//     categoryId: number,
//     page: number,
//     limit: number
//   ): Observable<Product[]> {
//     let params = new HttpParams()
//       .set('page', page.toString())
//       .set('limit', limit.toString());

//     // Nếu categoryId có giá trị (khác 0) thì thêm vào tham số
//     if (categoryId > 0) {
//       params = params.set('categoryId', categoryId.toString());
//     }

//     // Nếu keyword có giá trị thì thêm vào tham số
//     if (keyword) {
//       params = params.set('keyword', keyword);
//     }

//     return this.http.get<Product[]>(this.apiGetProducts, { params });
//   }

//   getDetailProduct(productId: number) {
//     return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Product } from '../components/models/product';
import { ProductResponse } from '../responses/product.response';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiGetProducts = `${environment.apiBaseUrl}/products`;
  private apiGetAllProducts = `${environment.apiBaseUrl}/products/get-products-by-keyword`;

  constructor(private http: HttpClient) {}

  getProducts(
    keyword: string,
    categoryId: number,
    page: number,
    limit: number
  ): Observable<Product[]> {
    // Khởi tạo HttpParams với các tham số cần thiết
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (categoryId > 0) {
      params = params.set('categoryId', categoryId.toString());
    }

    if (keyword) {
      params = params.set('keyword', keyword);
    }

    return this.http.get<Product[]>(this.apiGetProducts, { params });
  }

  getDetailProduct(productId: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
  }

  getProductsByIds(productIds: number[]): Observable<Product[]> {
    const params = new HttpParams().set('ids', productIds.join(','));
    return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, {
      params,
    });
  }

  getAllProducts(
    keyword: string,
    page: number,
    limit: number
  ): Observable<ProductResponse[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http
      .get<ProductResponse[]>(this.apiGetAllProducts, { params })
      .pipe(
        tap((data) => console.log('Received data:', data)) // Log dữ liệu ra console để kiểm tra
      );
  }
}
