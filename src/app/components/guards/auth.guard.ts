import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateFn,
} from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router'; // Đảm bảo bạn đã import Router ở đây.
import { inject } from '@angular/core';
import { UserResponse } from '../../responses/user/user.response';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  userResponse?: UserResponse | null;
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    // Giả sử bạn có một phương thức để lấy vai trò của người dùng từ token
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isTokenExpired = this.tokenService.isTokenExpired();
    const isUserIdValid = this.tokenService.getUserId() > 0;
    const isUser = this.userResponse?.role.name == 'user';

    debugger;
    if (isUser && !isTokenExpired && isUserIdValid) {
      return true; // Cho phép user truy cập
    } else if (!isUser && !isTokenExpired && isUserIdValid) {
      this.router.navigate(['/admin']); // Redirect người dùng không phải user về trang admin hoặc một trang khác
      return false;
    } else {
      this.router.navigate(['/login']); // Redirect nếu token hết hạn hoặc ID không hợp lệ
      return false;
    }
  }
}

// Sử dụng functional guard như sau:
export const AuthGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  debugger;
  return inject(AuthGuard).canActivate(next, state);
};
