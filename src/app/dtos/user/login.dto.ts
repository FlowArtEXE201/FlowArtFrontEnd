import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginDTO {
  @IsPhoneNumber('VN') // Thêm mã quốc gia
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role_id: number; // Sử dụng kiểu number

  constructor(data: any) {
    this.phone_number = data.phone_number;
    this.password = data.password;
    this.role_id = data.role_id; // Đảm bảo rằng role_id được gán
  }
}
