# Sử dụng hình ảnh Node.js làm cơ sở
FROM node:14

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt các phụ thuộc
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng mà ứng dụng Angular sẽ chạy
EXPOSE 4200

# Chạy ứng dụng Angular với chế độ phát triển
CMD ["npm", "start"]
