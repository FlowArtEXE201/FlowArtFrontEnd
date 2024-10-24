// import { Component, ViewChild, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ValidationErrors,
//   ValidatorFn,
//   AbstractControl,
// } from '@angular/forms';

// import { Router, ActivatedRoute } from '@angular/router';
// import { UserService } from '../../services/user.service';
// import { TokenService } from '../../services/token.service';
// import { UserResponse } from '../../responses/user/user.response';
// import { UpdateUserDTO } from '../../dtos/user/update.user.dto';
// @Component({
//   selector: 'user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss'],
// })
// export class UserProfileComponent implements OnInit {
//   userResponse?: UserResponse;
//   userProfileForm: FormGroup;
//   token: string | null = null;
//   constructor(
//     private formBuilder: FormBuilder,
//     private activatedRoute: ActivatedRoute,
//     private userService: UserService,
//     private router: Router,
//     private tokenService: TokenService
//   ) {
//     this.userProfileForm = this.formBuilder.group(
//       {
//         fullname: [''],
//         address: ['', [Validators.minLength(3)]],
//         password: ['', [Validators.minLength(3)]],
//         retype_password: ['', [Validators.minLength(3)]],
//         date_of_birth: [Date.now()],
//       },
//       {
//         validators: this.passwordMatchValidator, // Custom validator function for password match
//       }
//     );
//   }

//   ngOnInit(): void {
//     debugger;

//     this.token = this.tokenService.getToken();
//     this.userService.getUserDetail(this.token).subscribe({
//       next: (response: any) => {
//         debugger;
//         this.userResponse = {
//           ...response,
//           date_of_birth: new Date(response.date_of_birth),
//         };
//         this.userProfileForm.patchValue({
//           fullname: this.userResponse?.fullname ?? '',
//           address: this.userResponse?.address ?? '',
//           date_of_birth: this.userResponse?.date_of_birth
//             .toISOString()
//             .substring(0, 10),
//         });
//         this.userService.saveUserResponseToLocalStorage(this.userResponse);
//       },
//       complete: () => {
//         debugger;
//       },
//       error: (error: any) => {
//         debugger;
//         alert(error.error.message);
//       },
//     });
//   }
//   passwordMatchValidator(): ValidatorFn {
//     return (formGroup: AbstractControl): ValidationErrors | null => {
//       const password = formGroup.get('password')?.value;
//       const retypedPassword = formGroup.get('retype_password')?.value;
//       if (password !== retypedPassword) {
//         return { passwordMismatch: true };
//       }

//       return null;
//     };
//   }
//   save(): void {
//     debugger;
//     if (this.userProfileForm.valid) {
//       const updateUserDTO: UpdateUserDTO = {
//         fullname: this.userProfileForm.get('fullname')?.value ?? '', // Nếu là null, gán thành chuỗi rỗng
//         address: this.userProfileForm.get('address')?.value ?? '', // Nếu là null, gán thành chuỗi rỗng
//         password: this.userProfileForm.get('password')?.value ?? '', // Nếu là null, gán thành chuỗi rỗng
//         retype_password:
//           this.userProfileForm.get('retype_password')?.value ?? '', // Nếu là null, gán thành chuỗi rỗng
//         date_of_birth: this.userProfileForm.get('date_of_birth')?.value ?? null, // Có thể để null nếu cần
//       };

//       this.userService.updateUserDetail(this.token, updateUserDTO).subscribe({
//         next: (response: any) => {
//           this.userService.removeUserFromLocalStorage();
//           this.tokenService.removeToken();
//           this.router.navigate(['/login']);
//         },
//         error: (error: any) => {
//           alert(error.error.message);
//         },
//       });
//     } else {
//       if (this.userProfileForm.hasError('passwordMismatch')) {
//         alert('Mật khẩu và mật khẩu gõ lại chưa chính xác');
//       }
//     }
//   }
// }
import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { UserResponse } from '../../responses/user/user.response';
import { UpdateUserDTO } from '../../dtos/user/update.user.dto';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userResponse?: UserResponse;
  userProfileForm: FormGroup;
  token: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.userProfileForm = this.formBuilder.group(
      {
        fullname: [''],
        address: ['', [Validators.minLength(3)]],
        password: ['', [Validators.minLength(3)]],
        retype_password: ['', [Validators.minLength(3)]],
        date_of_birth: [Date.now()],
      },
      {
        validators: this.passwordMatchValidator, // Custom validator function for password match
      }
    );
  }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();

    if (this.token) {
      // Kiểm tra nếu token không phải null
      this.userService.getUserDetail(this.token).subscribe({
        next: (response: any) => {
          this.userResponse = {
            ...response,
            date_of_birth: new Date(response.date_of_birth),
          };
          this.userProfileForm.patchValue({
            fullname: this.userResponse?.fullname ?? '',
            address: this.userResponse?.address ?? '',
            date_of_birth: this.userResponse?.date_of_birth
              .toISOString()
              .substring(0, 10),
          });
          this.userService.saveUserResponseToLocalStorage(this.userResponse);
        },
        complete: () => {},
        error: (error: any) => {
          alert(error.error.message);
        },
      });
    } else {
      // Nếu token là null, điều hướng đến trang đăng nhập hoặc xử lý theo cách khác
      this.router.navigate(['/login']);
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const retypedPassword = formGroup.get('retype_password')?.value;
      if (password !== retypedPassword) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  save(): void {
    if (this.userProfileForm.valid) {
      const updateUserDTO: UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value ?? '',
        address: this.userProfileForm.get('address')?.value ?? '',
        password: this.userProfileForm.get('password')?.value ?? '',
        retype_password:
          this.userProfileForm.get('retype_password')?.value ?? '',
        date_of_birth: this.userProfileForm.get('date_of_birth')?.value ?? null,
      };

      if (this.token) {
        // Kiểm tra nếu token không phải null
        this.userService.updateUserDetail(this.token, updateUserDTO).subscribe({
          next: (response: any) => {
            this.userService.removeUserFromLocalStorage();
            this.tokenService.removeToken();
            this.router.navigate(['/login']);
          },
          error: (error: any) => {
            alert(error.error.message);
          },
        });
      } else {
        alert('Token không hợp lệ. Vui lòng đăng nhập lại.');
      }
    } else {
      if (this.userProfileForm.hasError('passwordMismatch')) {
        alert('Mật khẩu và mật khẩu gõ lại chưa chính xác');
      }
    }
  }
}
