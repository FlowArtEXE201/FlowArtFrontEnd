import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../responses/user/user.response';

@Injectable({
  providedIn: 'root',
})
export class UserGuard {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isTokenExpired = this.tokenService.isTokenExpired();
    const isUserIdValid = this.tokenService.getUserId() > 0;

    // Lấy thông tin người dùng từ localStorage hoặc một phương thức khác
    const userResponse: UserResponse | null =
      this.userService.getUserResponseFromLocalStorage();
    const isUser = userResponse?.role.name === 'user'; // Kiểm tra xem người dùng có phải là user không

    // Nếu là user, cho phép truy cập
    if (!isTokenExpired && isUserIdValid && isUser) {
      return true;
    } else if (userResponse?.role.name === 'admin') {
      // Nếu là admin, chuyển hướng đến trang admin
      this.router.navigate(['/admin']);
      return false;
    } else {
      // Nếu không có vai trò phù hợp, chuyển hướng về trang login
      this.router.navigate(['/login']);
      return false;
    }
  }
}

// Sử dụng functional guard như sau:
export const UserGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(UserGuard).canActivate(next, state);
};
