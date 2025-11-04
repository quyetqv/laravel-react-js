import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb';
import AdminLayout from '@/layouts/AdminLayout';

interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price_cents: number;
    meta: Record<string, unknown>;
    product?: { title: string };
}

interface OrderDetail {
    id: number;
    order_number: string;
    total_cents: number;
    status: string;
    payment_status: string;
    placed_at: string;
    user_id?: number;
    items: OrderItem[];
    user?: { id: number; name: string; email: string };
}

interface PageProps {
    order: OrderDetail;
    [key: string]: unknown;
}

export default function AdminOrderDetail() {
    const { order } = usePage<PageProps>().props;
    return (
        <AdminLayout>
            <AdminBreadcrumb items={[{ label: 'Quản lý đơn hàng', href: '/admin/orders' }, { label: `Đơn ${order.order_number}` }]} />
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold text-pink-700 mb-6">Chi tiết đơn hàng</h1>
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="mb-4">
                        <strong>Mã đơn:</strong> {order.order_number} <br />
                        <strong>Khách hàng:</strong> {order.user ? `${order.user.name} (${order.user.email})` : 'Khách vãng lai'} <br />
                        <strong>Trạng thái:</strong> {order.status} <br />
                        <strong>Thanh toán:</strong> {order.payment_status} <br />
                        <strong>Ngày đặt:</strong> {order.placed_at ? new Date(order.placed_at).toLocaleString('vi-VN') : ''} <br />
                        <strong>Tổng tiền:</strong> {(order.total_cents / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </div>
                    <h2 className="text-lg font-bold mb-2">Sản phẩm</h2>
                    <table className="w-full text-left border">
                        <thead>
                            <tr className="bg-pink-100">
                                <th className="p-2">Tên sản phẩm</th>
                                <th className="p-2">Số lượng</th>
                                <th className="p-2">Đơn giá</th>
                                <th className="p-2">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map(item => (
                                <tr key={item.id}>
                                    <td className="p-2">
                                        {item.product?.title
                                            || (typeof item.meta?.title === 'string' ? item.meta.title : 'Sản phẩm')}
                                    </td>
                                    <td className="p-2">{item.quantity}</td>
                                    <td className="p-2">{(item.price_cents / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td className="p-2">{((item.price_cents * item.quantity) / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6">
                    <Link href="/admin/orders" className="text-pink-600 hover:underline">← Quay lại danh sách đơn hàng</Link>
                </div>
            </div>
       </AdminLayout>
    );
}
