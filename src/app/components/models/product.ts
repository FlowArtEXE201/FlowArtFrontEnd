import { ProductImage } from './productImage';
export interface Product {
  id: number; // ID của sản phẩm
  name: string; // Tên sản phẩm
  price: number; // Giá sản phẩm
  thumbnail?: string; // Hình ảnh sản phẩm (có thể không có)
  description?: string; // Mô tả sản phẩm (có thể không có)
  categoryId: number; // ID của danh mục sản phẩm
  url?: string; // Đường dẫn tới hình ảnh sản phẩm (tính toán từ thumbnail)
  productImages: ProductImage[];
}
