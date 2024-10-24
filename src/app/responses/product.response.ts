export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: number; // Sửa lại cho đúng với dữ liệu nhận được
  created_at: string; // Hoặc Date nếu bạn muốn chuyển đổi thành kiểu Date
  updated_at: string; // Hoặc Date nếu bạn muốn chuyển đổi thành kiểu Date
  productImages: string | null; // Thay đổi kiểu theo dữ liệu thực tế
  thumbnail: string | null; // Thay đổi kiểu theo dữ liệu thực tế
}
