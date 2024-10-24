export class ProductDTO {
  id: number; // ID của sản phẩm
  name: string; // Tên sản phẩm
  price: number; // Giá sản phẩm
  description?: string; // Mô tả sản phẩm (có thể không có)
  categoryId: number; // ID của danh mục sản phẩm

  constructor(data: any) {
    this.id = data.id; // Gán ID
    this.name = data.name; // Gán tên sản phẩm
    this.price = data.price; // Gán giá sản phẩm
    this.description = data.description; // Gán mô tả sản phẩm
    this.categoryId = data.categoryId; // Gán ID danh mục sản phẩm
  }
}
