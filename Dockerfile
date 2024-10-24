# Sử dụng hình ảnh Node.js mới hơn làm cơ sở
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt các phụ thuộc
COPY package*.json ./

# Cài đặt npm mới nhất
RUN npm install -g npm@latest

# Cài đặt các phụ thuộc với legacy peer deps
RUN npm install --legacy-peer-deps

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng mà ứng dụng Angular sẽ chạy
EXPOSE 4200

# Chạy ứng dụng Angular với chế độ phát triển
CMD ["npm", "start"]
