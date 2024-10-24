import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginResponse } from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../models/role';
import { UserResponse } from '../../responses/user/user.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm; // Sử dụng tên biến đúng ở đây
  phoneNumber: string = '';
  password: string = '';
  role_id: number = 1; // Đặt mặc định là số

  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;
  userRespone?: UserResponse;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.loadRoles(); // Gọi hàm loadRoles
  }

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
        // Nếu có vai trò được chọn, gán ID cho role_id
        if (this.selectedRole) {
          this.role_id = this.selectedRole.id;
        }
      },
      error: (error: any) => {
        console.error('Error getting roles: ', error);
        alert('Failed to load roles. Please try again.');
      },
    });
  }

  onPhoneNumberChange() {
    console.log(`phone typed: ${this.phoneNumber}`);
  }

  login() {
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1, // Sử dụng ID từ selectedRole hoặc mặc định là 1
    };

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        const { token } = response;
        this.tokenService.setToken(token);

        if (this.rememberMe) {
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (response: any) => {
              debugger;
              this.userRespone = {
                id: response.id,
                fullname: response.fullname,
                address: response.address,
                is_active: response.is_active,
                date_of_birth: new Date(response.date_of_birth),
                facebook_account_id: response.facebook_account_id,
                google_account_id: response.google_account_id,
                role: response.role,
              };
              // this. userRespone = {
              //   ...response,
              //   date_of_birth: new Date(response.date_of_birth),
              // }
              this.userService.saveUserResponseToLocalStorage(this.userRespone);
              if (this.userRespone.role.name === 'admin') {
                this.router.navigate(['/admin']); // Đặt đúng đường dẫn ở đây
              } else if (this.userRespone?.role.name == 'user') {
                this.router.navigate(['/']); // Đặt đúng đường dẫn ở đây
              }
            },
            complete: () => {
              console.log('Login completed');
            },
            error: (error: any) => {
              console.log(error);
              const errorMessage =
                error.error?.message ||
                'Đã xảy ra lỗi trong quá trình đăng nhập';
              alert(`Cannot login, error: ${errorMessage}`);
            },
          });
        }
        // Điều hướng đến trang sau khi đăng nhập thành công
      },
      complete: () => {
        console.log('Login completed');
      },
      error: (error: any) => {
        console.log(error);
        const errorMessage =
          error.error?.message || 'Đã xảy ra lỗi trong quá trình đăng nhập';
        alert(`Cannot login, error: ${errorMessage}`);
      },
    });
  }
}
