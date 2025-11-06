import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb';
import AdminLayout from '@/layouts/AdminLayout';

interface Order {
    id: number;
    order_number: string;
    total_cents: number;
    status: string;
    payment_status: string;
    placed_at: string;
    user_id?: number;
}

interface StatusOption {
    value: string;
    label: string;
}

interface PageProps {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{ url: string|null; label: string; active: boolean }>;
    };
    filters: {
        status?: string;
        from?: string;
        to?: string;
        perPage?: string;
    };
    statusOptions: StatusOption[];
    [key: string]: unknown;
}

export default function AdminOrders() {
    const { orders, filters, statusOptions } = usePage<PageProps>().props;
    const [status, setStatus] = useState(filters.status || '');
    const [from, setFrom] = useState(filters.from || '');
    const [to, setTo] = useState(filters.to || '');
    const [perPage, setPerPage] = useState(filters.perPage || '10');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/orders', { status, from, to, perPage }, { preserveState: true });
    };

    const getStatusBadge = (statusValue: string) => {
        const option = statusOptions.find(opt => opt.value === statusValue);
        if (!option) return statusValue;

        // Simplified badge for table view
        const colorMap: Record<string, string> = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'processing': 'bg-blue-100 text-blue-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800',
        };

        const colorClass = colorMap[statusValue] || 'bg-gray-100 text-gray-800';

        return (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${colorClass}`}>
                {option.label}
            </span>
        );
    };

    return (
        <AdminLayout>
            <AdminBreadcrumb items={[{ label: 'Quản lý đơn hàng' }]} />
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold text-pink-700 mb-6">Quản lý đơn hàng</h1>
                <div className="bg-white rounded-xl shadow p-6">
                    <form className="flex flex-wrap gap-4 mb-4 items-end" onSubmit={handleFilter}>
                        <select className="border px-3 py-2 rounded" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="">Tất cả trạng thái</option>
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <input type="date" className="border px-3 py-2 rounded" value={from} onChange={e => setFrom(e.target.value)} placeholder="Từ ngày" />
                        <input type="date" className="border px-3 py-2 rounded" value={to} onChange={e => setTo(e.target.value)} placeholder="Đến ngày" />
                        <select className="border px-3 py-2 rounded" value={perPage} onChange={e => setPerPage(e.target.value)}>
                            <option value="10">10/trang</option>
                            <option value="20">20/trang</option>
                            <option value="50">50/trang</option>
                        </select>
                        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Lọc</button>
                        <button type="button" className="bg-gray-200 px-4 py-2 rounded ml-2" onClick={() => { setStatus(''); setFrom(''); setTo(''); setPerPage('10'); router.get('/admin/orders'); }}>Đặt lại</button>
                    </form>
                    <table className="w-full text-left border">
                        <thead>
                            <tr className="bg-pink-100">
                                <th className="p-2">Mã đơn</th>
                                <th className="p-2">Tổng tiền</th>
                                <th className="p-2">Trạng thái</th>
                                <th className="p-2">Thanh toán</th>
                                <th className="p-2">Ngày đặt</th>
                                <th className="p-2">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.length === 0 && (
                                <tr><td colSpan={7} className="text-center py-4">Không có đơn hàng nào</td></tr>
                            )}
                            {orders.data.map(order => (
                                <tr key={order.id}>
                                    <td className="p-2">{order.order_number}</td>
                                    <td className="p-2">{order.user_id || 'Khách vãng lai'}</td>
                                    <td className="p-2">{(order.total_cents / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td className="p-2">{getStatusBadge(order.status)}</td>
                                    <td className="p-2">{order.payment_status}</td>
                                    <td className="p-2">{order.placed_at ? new Date(order.placed_at).toLocaleString('vi-VN') : ''}</td>
                                    <td className="p-2">
                                        <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:underline">Xem</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Phân trang */}
                    <div className="flex justify-center mt-4 gap-1 flex-wrap">
                        {orders.links && orders.links.map((link, idx) => (
                            <button
                                key={idx}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded ${link.active ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                onClick={() => link.url && router.get(link.url)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
