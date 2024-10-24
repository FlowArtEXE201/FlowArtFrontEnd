// header.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../responses/user/user.response';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;

  constructor(
    private userService: UserService,
    private popoverConfig: NgbPopoverConfig,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }
  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    if (index === 0) {
      // Điều hướng đến trang User Profile
      console.log('Current Token:', this.tokenService.getToken()); // In ra token khi điều hướng
      console.log('Navigating to user-profile');

      this.router.navigate(['/user-profile']);
    } else if (index === 2) {
      // Đăng xuất
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/orders']);
    }
    this.isPopoverOpen = false; // Đóng popover sau khi nhấp vào một mục
  }

  setActiveNavItem(index: number) {
    this.activeNavItem = index;
  }
}
