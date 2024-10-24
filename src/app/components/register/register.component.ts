import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phoneNumber: string; // Đổi thành phoneNumber
  password: string;
  confirmPassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor(private userService: UserService, private router: Router) {
    this.phoneNumber = ''; // Đổi thành phoneNumber
    this.password = '';
    this.confirmPassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneNumberChange() {
    console.log(`phone typed: ${this.phoneNumber}`); // Đổi thành phoneNumber
  }

  register() {
    const registerDTO: RegisterDTO = {
      fullname: this.fullName,
      phone_number: this.phoneNumber, // Đổi thành phoneNumber
      address: this.address,
      password: this.password,
      retype_password: this.confirmPassword,
      date_of_birth: this.dateOfBirth, // Chuyển đổi thành định dạng YYYY-MM-DD
      facebook_account_id: 0,
      google_account_id: 0,
      role_id: 1,
    };

    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        this.router.navigate(['/login']);
      },
      complete: () => {
        alert('Registation successfully!!!!');
      },
      error: (error: any) => {
        alert(`cannot register,error: ${error.error}`);
      },
    });
  }

  checkPasswordMatch() {
    if (this.password !== this.confirmPassword) {
      this.registerForm.form.controls['confirmPassword'].setErrors({
        passwordMismatch: true,
      });
    } else {
      this.registerForm.form.controls['confirmPassword'].setErrors(null);
    }
  }

  onDateOfBirthChange() {}

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({
          invalidAge: true,
        });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
