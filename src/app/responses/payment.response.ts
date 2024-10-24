export interface PaymentResponse {
  bin: string; // Mã BIN của thẻ
  accountNumber: string; // Số tài khoản
  accountName: string; // Tên tài khoản
  amount: number; // Số tiền thanh toán
  description: string; // Mô tả thanh toán
  orderCode: number; // Mã đơn hàng
  currency: string; // Loại tiền tệ
  paymentLinkId: string; // ID của liên kết thanh toán
  status: string; // Trạng thái thanh toán
  checkoutUrl: string; // URL để thanh toán
  qrCode?: string; // Mã QR (nếu có)
}
