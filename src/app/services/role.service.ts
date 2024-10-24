import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiGetRoles = `${environment.apiBaseUrl}/roles`;

  constructor(private http: HttpClient) {}
  getRoles(): Observable<any> {
    return this.http.get<any[]>(this.apiGetRoles);
  }
}
