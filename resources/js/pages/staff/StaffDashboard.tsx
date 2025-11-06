import React from 'react';
import { Head, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruck,
    faBoxOpen,
    faClipboardCheck,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

interface Staff {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
}

interface Shipping {
    id: number;
    order_id: number;
    tracking_code: string;
    status: string;
    created_at: string;
    order?: {
        order_number: string;
        customer_name?: string;
        customer_address?: string;
    };
}

interface PageProps {
    staff: Staff;
    shippings: {
        data: Shipping[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function StaffDashboard({ staff, shippings }: PageProps) {
    const handleLogout = () => {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            router.post('/staff/logout');
        }
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            shipping: 'bg-blue-100 text-blue-800',
            delivered: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    const getRoleLabel = (role: string) => {
        const roles: Record<string, string> = {
            delivery: 'Nhân viên giao hàng',
            warehouse: 'Nhân viên kho',
            manager: 'Quản lý',
        };
        return roles[role] || role;
    };

    return (
        <>
            <Head title="Dashboard Nhân viên" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faTruck} className="w-8 h-8 text-indigo-600" />
                                <h1 className="text-2xl font-bold text-gray-900">Dashboard Nhân viên</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{staff.name}</p>
                                    <p className="text-xs text-gray-500">{getRoleLabel(staff.role)}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <FontAwesomeIcon icon={faBoxOpen} className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Tổng đơn hàng</p>
                                    <p className="text-2xl font-bold text-gray-900">{shippings.total}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-100 rounded-lg">
                                    <FontAwesomeIcon icon={faTruck} className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Đang giao</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {shippings.data.filter(s => s.status === 'shipping').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <FontAwesomeIcon icon={faClipboardCheck} className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Đã giao</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {shippings.data.filter(s => s.status === 'delivered').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping List */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Đơn hàng của tôi</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mã vận đơn
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Đơn hàng
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Khách hàng
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Địa chỉ
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ngày tạo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {shippings.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                Chưa có đơn hàng nào được giao
                                            </td>
                                        </tr>
                                    ) : (
                                        shippings.data.map(shipping => (
                                            <tr key={shipping.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {shipping.tracking_code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {shipping.order?.order_number || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {shipping.order?.customer_name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {shipping.order?.customer_address || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(shipping.status)}`}>
                                                        {shipping.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(shipping.created_at).toLocaleDateString('vi-VN')}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
