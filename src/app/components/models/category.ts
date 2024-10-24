export interface Category {
  id: number; // ID của danh mục
  name: string; // Tên của danh mục
  description?: string; // Mô tả (có thể có hoặc không)
  createdAt?: Date; // Thời gian tạo (có thể có hoặc không)
  updatedAt?: Date; // Thời gian cập nhật (có thể có hoặc không)
}
