import { IsString, IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  id: number; // Thêm trường id

  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(data: any) {
    this.id = data.id; // Gán giá trị cho trường id
    this.name = data.name; // Gán giá trị cho trường name
  }
}
