import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb';
import AdminLayout from '@/layouts/AdminLayout';

interface Shipping {
    id: number;
    name: string;
    price_cents: number;
    description?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    order?: {
        id: number;
        user?: {
            id: number;
            name: string;
        };
        items?: Array<{ product_name: string }>;
        customer_name?: string;
        customer_phone?: string;
        customer_email?: string;
        customer_address?: string;
        payment_method?: string;
    };
}

interface PageProps {
    shippings: {
        data: Shipping[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{ url: string|null; label: string; active: boolean }>;
    };
    filters: {
        status?: string;
        perPage?: string;
    };
    [key: string]: unknown;
}

export default function AdminShippings() {
    const { shippings, filters } = usePage<PageProps>().props;
    const [status, setStatus] = useState(filters.status || '');
    const [perPage, setPerPage] = useState(filters.perPage || '10');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/shippings', { status, perPage }, { preserveState: true });
    };

    return (
        <AdminLayout>
            <AdminBreadcrumb items={[{ label: 'Quản lý shipping' }]} />
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold text-indigo-700 mb-6">Quản lý shipping</h1>
                <div className="bg-white rounded-xl shadow p-6">
                    <form className="flex flex-wrap gap-4 mb-4 items-end" onSubmit={handleFilter}>
                        <select className="border px-3 py-2 rounded" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="">Tất cả trạng thái</option>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Ngừng hoạt động</option>
                        </select>
                        <select className="border px-3 py-2 rounded" value={perPage} onChange={e => setPerPage(e.target.value)}>
                            <option value="10">10/trang</option>
                            <option value="20">20/trang</option>
                            <option value="50">50/trang</option>
                        </select>
                        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Lọc</button>
                        <button type="button" className="bg-gray-200 px-4 py-2 rounded ml-2" onClick={() => { setStatus(''); setPerPage('10'); router.get('/admin/shippings'); }}>Đặt lại</button>
                    </form>
                    <table className="w-full text-left border">
                        <thead>
                            <tr className="bg-indigo-100">
                                <th className="p-2">ID</th>
                                <th className="p-2">Tên shipping</th>
                                <th className="p-2">Người đặt</th>
                                <th className="p-2">SĐT</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Địa chỉ</th>
                                <th className="p-2">Thanh toán</th>
                                <th className="p-2">Giá</th>
                                <th className="p-2">Mô tả</th>
                                <th className="p-2">Trạng thái</th>
                                <th className="p-2">Ngày tạo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shippings.data.length === 0 && (
                                <tr><td colSpan={6} className="text-center py-4">Không có shipping nào</td></tr>
                            )}
                            {shippings.data.map(s => (
                                <tr key={s.id}>
                                    <td className="p-2">{s.id}</td>
                                    <td className="p-2">
                                        {(() => {
                                            // Lấy tên sản phẩm đầu tiên (nếu có)
                                            const productName = s.order?.items && s.order.items.length > 0 ? s.order.items[0].product_name : '';
                                            // Lấy tên khách hàng (nếu có)
                                            const customerName = s.order?.user?.name || '';
                                            return [productName, customerName].filter(Boolean).join(' - ');
                                        })()}
                                    </td>
                                    <td className="p-2">{s.order?.customer_name || ''}</td>
                                    <td className="p-2">{s.order?.customer_phone || ''}</td>
                                    <td className="p-2">{s.order?.customer_email || ''}</td>
                                    <td className="p-2">{s.order?.customer_address || ''}</td>
                                    <td className="p-2">{s.order?.payment_method?.toUpperCase() || ''}</td>
                                    <td className="p-2">{(s.price_cents / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td className="p-2">{s.description}</td>
                                    <td className="p-2">{s.is_active ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>
                                    <td className="p-2">{s.created_at ? new Date(s.created_at).toLocaleString('vi-VN') : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Phân trang */}
                    <div className="flex justify-center mt-4 gap-1 flex-wrap">
                        {shippings.links && shippings.links.map((link, idx) => (
                            <button
                                key={idx}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded ${link.active ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
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
