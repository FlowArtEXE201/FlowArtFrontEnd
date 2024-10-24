import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  isString,
} from 'class-validator';

export class RegisterDTO {
  @IsString()
  fullname: string;

  @IsPhoneNumber()
  phone_number: string; // Sử dụng kiểu string cho số điện thoại

  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  retype_password: string;

  @IsDate()
  date_of_birth: Date; // Đảm bảo kiểu dữ liệu là string cho ngày sinh
  facebook_account_id: number = 0;
  google_account_id: number = 0;
  role_id: number = 1;

  constructor(data: any) {
    this.fullname = data.fullname;
    this.phone_number = data.phone_number;
    this.address = data.address;
    this.password = data.password;
    this.retype_password = data.retype_password;
    this.date_of_birth = data.date_of_birth; // Nên chuyển đổi sang định dạng YYYY-MM-DD bên ngoài lớp này
    this.facebook_account_id = data.facebook_account_id || 0; // Mặc định là 0 nếu không có giá trị
    this.google_account_id = data.google_account_id || 0; // Mặc định là 0 nếu không có giá trị
    this.role_id = data.role_id || 1; // Mặc định là 1 nếu không có giá trị
  }
}
