import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // Nhập đúng đường dẫn TokenService
import { PaymentDTO } from '../dtos/user/payment.dto';
import { PaymentResponse } from '../responses/payment.response';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentApiUrl = 'http://localhost:8080/api/v1/payment'; // Thay bằng URL thực tế của bạn

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  postPayment(paymentData: PaymentDTO): Observable<PaymentResponse> {
    const token = this.tokenService.getToken(); // Lấy token từ TokenService

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    });

    return this.http.post<PaymentResponse>(this.paymentApiUrl, paymentData, {
      headers,
    });
  }
}
