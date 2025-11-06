# Laravel React E-commerce Project

Dự án website thương mại điện tử được xây dựng với Laravel 12, React, Inertia.js, TypeScript và TailwindCSS.

## 📋 Tổng quan dự án

Hệ thống e-commerce đầy đủ với các chức năng quản lý sản phẩm, đơn hàng, vận chuyển, và phân quyền người dùng.

## 🚀 Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 18 + TypeScript
- **UI Framework**: TailwindCSS + FontAwesome Icons
- **Routing**: Inertia.js (sử dụng string URLs trực tiếp)
- **Build Tool**: Vite
- **Authentication**: Laravel Breeze
- **Database**: MySQL

## ✨ Tính năng đã hoàn thành

### 🔐 Authentication & Authorization

- ✅ Laravel Breeze cho authentication
- ✅ Đã xóa hoàn toàn Fortify, Wayfinder, 2FA
- ✅ Phân quyền: Customer, Staff, Admin
- ✅ Middleware bảo vệ route: `EnsureUserIsAdmin`, `EnsureUserIsStaff`
- ✅ Guard riêng cho từng loại user
- ✅ Chuyển hướng tự động theo role

### 👥 Staff Management System

- ✅ Hệ thống nhân viên với đăng nhập riêng (`/staff/login`)
- ✅ Bảng `staff` tham chiếu đến `users` (user_id, position, phone, address)
- ✅ Staff dashboard với danh sách đơn hàng được giao
- ✅ 3 loại nhân viên: delivery, warehouse, manager
- ✅ Staff seeder với 3 tài khoản mẫu

### 🛍️ E-commerce Core

- ✅ Danh sách sản phẩm với phân trang, filter, search
- ✅ Chi tiết sản phẩm
- ✅ Giỏ hàng (session-based)
- ✅ Checkout flow với thông tin khách hàng
- ✅ Lưu thông tin customer (name, phone, email, address, payment_method)

### 📦 Order Management

- ✅ Quản lý đơn hàng admin (`/admin/orders`)
- ✅ Chi tiết đơn hàng với đầy đủ thông tin
- ✅ Filter theo status, date range, pagination
- ✅ Hiển thị thông tin khách hàng và payment
- ✅ Status tracking: pending → processing → completed/cancelled

### 🚚 Advanced Shipping System

- ✅ **Bảng `shipping_providers`**: Quản lý đơn vị vận chuyển
    - GHN, GHTK, Viettel Post, Vietnam Post
    - Tính phí tự động theo khối lượng (base_price + price_per_kg)
- ✅ **Bảng `shippings`** với đầy đủ fields:
    - `shipping_type`: internal/external
    - `shipping_provider_id`, `staff_id`
    - `tracking_code`, `shipping_fee_cents`, `weight_kg`, `notes`
- ✅ **Modal tạo vận chuyển** từ chi tiết đơn hàng:
    - Chọn đơn vị bên ngoài hoặc nhân viên nội bộ
    - Nhập khối lượng và tính phí real-time
    - Tự động generate tracking code
    - Cập nhật trạng thái đơn hàng thành "processing"
- ✅ Hiển thị thông tin vận chuyển trong chi tiết đơn hàng
- ✅ Shipping seeder với demo data

### 📊 Admin Panel

- ✅ Admin Dashboard (`/admin`)
- ✅ Quản lý sản phẩm: Danh sách, filter, phân trang
- ✅ Quản lý đơn hàng với filter và status badges
- ✅ Quản lý shipping methods
- ✅ AdminSidebar với FontAwesome icons
- ✅ AdminLayout cho consistent UI
- ✅ AdminBreadcrumb cho navigation

### 🎨 UI/UX Components

- ✅ **Modular Components**:
    - Banner, Menu, Navibar, Footer
    - Breadcrumb (public), AdminBreadcrumb (admin)
    - AdminSidebar với icons
    - CreateShippingModal
- ✅ **FontAwesome Integration**: Icons cho toàn bộ admin UI
- ✅ **Status Management**: Config-based với StatusHelper
- ✅ Responsive design với TailwindCSS
- ✅ Badge system với màu sắc theo status

### ⚙️ System Configuration

- ✅ **Status Config** (`config/statuses.php`):
    - Quản lý tập trung: order_status, payment_status, shipping_status
    - Staff positions, user roles, payment methods
    - Transition rules và color schemes
- ✅ **StatusHelper** (`app/Helpers/StatusHelper.php`):
    - `getLabel()`, `getColor()`, `getOptions()`
    - `getNextStatuses()`, `canTransitionTo()`
    - `getBadgeClass()` cho Tailwind CSS
- ✅ Chuẩn hóa `.gitignore` cho Laravel + React + Vite

## 🗄️ Database Schema

### Core Tables

- `users`: Thông tin người dùng (name, email, password, role, is_admin)
- `products`: Sản phẩm
- `orders`: Đơn hàng với customer info và payment info
- `order_items`: Chi tiết sản phẩm trong đơn
- `staff`: Thông tin nhân viên (user_id, position, phone, address, is_active)

### Shipping Tables

- `shipping_providers`: Đơn vị vận chuyển (name, code, base_price, price_per_kg)
- `shippings`: Vận chuyển (order_id, shipping_type, provider/staff, tracking_code, fee, weight)

## 📁 Project Structure

```
app/
├── Helpers/
│   └── StatusHelper.php          # Helper quản lý status
├── Http/
│   ├── Controllers/
│   │   ├── Admin/
│   │   │   └── AdminShippingCreateController.php
│   │   ├── Staff/
│   │   │   ├── StaffAuthController.php
│   │   │   └── StaffDashboardController.php
│   │   ├── AdminOrderController.php
│   │   ├── CartController.php
│   │   └── ProductController.php
│   └── Middleware/
│       ├── EnsureUserIsAdmin.php
│       └── EnsureUserIsStaff.php
├── Models/
│   ├── Order.php
│   ├── Shipping.php
│   ├── ShippingProvider.php
│   ├── Staff.php
│   └── User.php

config/
└── statuses.php                  # Cấu hình status tập trung

resources/js/
├── components/
│   ├── AdminSidebar.tsx          # Sidebar menu với icons
│   ├── CreateShippingModal.tsx   # Modal tạo vận chuyển
│   ├── Banner.tsx, Menu.tsx, Navibar.tsx, Footer.tsx
│   └── Breadcrumb.tsx, AdminBreadcrumb.tsx
├── layouts/
│   └── AdminLayout.tsx           # Layout chung cho admin
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminOrders.tsx       # Danh sách đơn hàng
│   │   ├── AdminOrderDetail.tsx  # Chi tiết + tạo shipping
│   │   ├── AdminShippings.tsx
│   │   └── AdminProducts.tsx
│   └── staff/
│       ├── StaffLogin.tsx        # Đăng nhập staff
│       └── StaffDashboard.tsx    # Dashboard staff

database/
├── migrations/
│   ├── create_staff_table.php
│   ├── create_shipping_providers_table.php
│   └── update_shippings_table_add_provider_and_staff.php
└── seeders/
    ├── StaffSeeder.php
    └── ShippingProviderSeeder.php
```

## 🔧 Setup & Installation

### 1. Clone và cài đặt dependencies

```bash
git clone <repository-url>
cd laravel-react-js
composer install
npm install
```

### 2. Cấu hình môi trường

```bash
cp .env.example .env
php artisan key:generate
```

Cấu hình database trong `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 3. Chạy migrations và seeders

```bash
php artisan migrate
php artisan db:seed --class=StaffSeeder
php artisan db:seed --class=ShippingProviderSeeder
```

### 4. Chạy development server

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

### 5. Build production

```bash
npm run build
```

## 👤 Demo Accounts

### Admin

- Email: `admin@example.com`
- Password: `password`

### Staff Accounts

- **Delivery**: `delivery@example.com` / `password`
- **Warehouse**: `warehouse@example.com` / `password`
- **Manager**: `manager@example.com` / `password`

## 🌐 Routes

### Public Routes

- `/` - Trang chủ (danh sách sản phẩm)
- `/products/{id}` - Chi tiết sản phẩm
- `/cart` - Giỏ hàng
- `/cart/checkout` - Thanh toán
- `/login`, `/register` - Xác thực

### Admin Routes (Protected by `auth`, `verified` middleware)

- `/admin` - Dashboard
- `/admin/products` - Quản lý sản phẩm
- `/admin/orders` - Quản lý đơn hàng
- `/admin/orders/{id}` - Chi tiết đơn hàng
- `/admin/orders/{id}/shipping/data` - Lấy data cho modal shipping
- `/admin/orders/{id}/shipping` - Tạo vận chuyển (POST)
- `/admin/shipping/calculate-fee` - Tính phí vận chuyển (POST)
- `/admin/shippings` - Quản lý vận chuyển

### Staff Routes (Protected by `staff` middleware)

- `/staff/login` - Đăng nhập staff
- `/staff/dashboard` - Dashboard staff
- `/staff/logout` - Đăng xuất (POST)

## 🎯 Key Features

### 1. Shipping Creation Workflow

1. Admin vào chi tiết đơn hàng
2. Click nút "Tạo vận chuyển"
3. Modal hiện lên với 2 options:
    - **External**: Chọn provider (GHN, GHTK, etc.)
    - **Internal**: Chọn staff giao hàng
4. Nhập khối lượng → Tự động tính phí
5. Thêm ghi chú (optional)
6. Submit → Tạo shipping với tracking code tự động
7. Đơn hàng chuyển sang trạng thái "processing"
8. Hiển thị thông tin shipping ngay trên chi tiết đơn

### 2. Status Management System

- Tất cả status định nghĩa trong `config/statuses.php`
- `StatusHelper` cung cấp các method tiện ích
- Dynamic options cho dropdowns
- Badge system với màu sắc tự động
- Transition rules để validate chuyển đổi status

### 3. Staff Authentication

- Sử dụng bảng `users` với role='staff'
- Bảng `staff` chỉ lưu thông tin bổ sung
- Guard `web` thông thường + middleware kiểm tra role
- Staff dashboard riêng với danh sách shipping được giao

## 📝 Development Notes

### TypeScript & Vite

- Dự án sử dụng TypeScript strict mode
- Build với Vite cho performance tốt
- Hot Module Replacement (HMR) trong dev

### Code Organization

- Backend: Controller → Service → Model pattern
- Frontend: Component-based với TypeScript interfaces
- Shared layouts và components để DRY

### Future Enhancements

- [ ] CRUD đầy đủ cho products, users
- [ ] Báo cáo doanh thu, thống kê
- [ ] Real-time notifications
- [ ] Email notifications cho orders/shipping
- [ ] Advanced search và filters
- [ ] Mobile app (React Native)
- [ ] API documentation
- [ ] Unit & Integration tests
- [ ] CI/CD pipeline

## 📄 License

This project is open-sourced software licensed under the MIT license.

## 👨‍💻 Author

Developed as a learning project for Laravel + React + TypeScript integration.
