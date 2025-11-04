import React from 'react';

import AdminLayout from '@/layouts/AdminLayout';
import AdminBreadcrumb from '@/components/AdminBreadcrumb';

const AdminDashboard: React.FC = () => {
    return (
        <AdminLayout>
            <AdminBreadcrumb items={[{ label: 'Admin Dashboard' }]} />
            <h1 className="text-3xl font-bold text-blue-700 mb-8">Quản lý hệ thống</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-5xl mb-2 text-indigo-500">
                        <i className="fas fa-truck"></i>
                    </span>
                    <h2 className="text-xl font-semibold mb-2">Shipping</h2>
                    <a href="/admin/shippings" className="text-blue-600 hover:underline">Quản lý shipping</a>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-5xl mb-2 text-pink-500">
                        <i className="fas fa-box"></i>
                    </span>
                    <h2 className="text-xl font-semibold mb-2">Sản phẩm</h2>
                    <a href="/admin/products" className="text-blue-600 hover:underline">Quản lý sản phẩm</a>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-5xl mb-2 text-green-500">
                        <i className="fas fa-users"></i>
                    </span>
                    <h2 className="text-xl font-semibold mb-2">Người dùng</h2>
                    <a href="/admin/users" className="text-blue-600 hover:underline">Quản lý người dùng</a>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-5xl mb-2 text-yellow-500">
                        <i className="fas fa-chart-line"></i>
                    </span>
                    <h2 className="text-xl font-semibold mb-2">Thống kê</h2>
                    <a href="/admin/reports" className="text-blue-600 hover:underline">Xem báo cáo</a>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-5xl mb-2 text-yellow-500">
                        <i className="fas fa-chart-line"></i>
                    </span>
                    <h2 className="text-xl font-semibold mb-2">Quản lý đơn hàng</h2>
                    <a href="/admin/orders" className="text-blue-600 hover:underline">Xem báo cáo</a>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;
