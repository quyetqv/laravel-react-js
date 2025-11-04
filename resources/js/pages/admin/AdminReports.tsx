import React from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb';
import AdminLayout from '@/layouts/AdminLayout';

export default function AdminReports() {
    return (
        <AdminLayout>
            <AdminBreadcrumb items={[{ label: 'Báo cáo' }]} />
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold text-yellow-700 mb-6">Thống kê & Báo cáo</h1>
                <div className="bg-white rounded-xl shadow p-6">
                    {/* Ví dụ dữ liệu thống kê tĩnh */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="bg-yellow-100 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-yellow-700">120</div>
                            <div className="text-sm text-gray-600">Sản phẩm đang bán</div>
                        </div>
                        <div className="bg-green-100 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-700">350</div>
                            <div className="text-sm text-gray-600">Người dùng đăng ký</div>
                        </div>
                        <div className="bg-pink-100 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-pink-700">25</div>
                            <div className="text-sm text-gray-600">Đơn hàng hôm nay</div>
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold mb-4">Báo cáo doanh thu</h2>
                    <table className="w-full text-left border">
                        <thead>
                            <tr className="bg-yellow-200">
                                <th className="p-2">Tháng</th>
                                <th className="p-2">Doanh thu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2">10/2025</td>
                                <td className="p-2">50,000,000₫</td>
                            </tr>
                            <tr>
                                <td className="p-2">09/2025</td>
                                <td className="p-2">45,000,000₫</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
