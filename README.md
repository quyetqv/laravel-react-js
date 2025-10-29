# laravel-react-js

## Đã hoàn thành

- Xóa toàn bộ code Fortify, Wayfinder, 2FA, và các helper route cũ
- Sử dụng Breeze cho xác thực
- Chỉ dùng URL string trực tiếp cho route frontend (không Ziggy, không helper)
- Modular hóa UI: Banner, Menu, Navibar, Footer, Breadcrumb
- Tạo các trang quản trị admin: Dashboard, Quản lý sản phẩm, Quản lý người dùng, Báo cáo
- Tách riêng Breadcrumb cho admin
- Đã có backend cho admin: phân trang, lọc sản phẩm, bảo vệ route bằng middleware is_admin
- Đăng nhập admin tự động chuyển hướng về dashboard admin
- Hiển thị danh sách sản phẩm, phân trang, lọc, tìm kiếm trong admin
- Đã seed user admin mẫu
- Đã chuẩn hóa .gitignore cho dự án Laravel + React + Vite

## Chưa hoàn thành / Đang phát triển

- Chức năng thêm/sửa/xóa sản phẩm trong admin (mới chỉ có giao diện)
- Quản lý đơn hàng, báo cáo doanh thu, thống kê
- Quản lý người dùng (CRUD)
- Quản lý phân quyền nâng cao
- Tích hợp gửi mail, thông báo
- Tối ưu UI/UX cho mobile
- Viết test cho backend/frontend
- Checkout, xử lý đơn hàng, shipping/tracking
- Flow xử lý đơn hàng chi tiết

## Ghi chú

- Dự án sử dụng Laravel 12, React, Inertia, TypeScript, Vite, TailwindCSS
- Để phát triển: `npm install` + `npm run dev` + `php artisan serve`
- Để build production: `npm run build`
- Để seed admin: `php artisan db:seed --class=AdminUserSeeder`
