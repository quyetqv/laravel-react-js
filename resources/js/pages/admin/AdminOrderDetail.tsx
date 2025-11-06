import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb';
import AdminLayout from '@/layouts/AdminLayout';
import CreateShippingModal from '@/components/CreateShippingModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price_cents: number;
    meta: Record<string, unknown>;
    product?: { title: string };
}

interface Shipping {
    id: number;
    tracking_code: string;
    carrier_name: string;
    status: string;
    shipping_type: string;
    shipping_fee_cents: number;
    weight_kg: number;
    notes?: string;
    created_at: string;
    shipping_provider?: {
        name: string;
        code: string;
    };
    staff?: {
        user: {
            name: string;
        };
        phone?: string;
    };
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
    shippings?: Shipping[];
    user?: { id: number; name: string; email: string };
}

interface StatusConfig {
    [key: string]: {
        label: string;
        color: string;
        description: string;
    };
}

interface PageProps {
    order: OrderDetail;
    statusConfig: {
        order: StatusConfig;
        payment: StatusConfig;
        shipping: StatusConfig;
    };
    [key: string]: unknown;
}

export default function AdminOrderDetail() {
    const { order, statusConfig } = usePage<PageProps>().props;
    const [showShippingModal, setShowShippingModal] = useState(false);

    const handleShippingSuccess = () => {
        router.reload();
    };

    const getStatusBadge = (status: string, type: 'order' | 'payment' | 'shipping') => {
        const config = statusConfig[type]?.[status];
        if (!config) return status;

        const colorClasses: Record<string, string> = {
            yellow: 'bg-yellow-100 text-yellow-800',
            blue: 'bg-blue-100 text-blue-800',
            green: 'bg-green-100 text-green-800',
            red: 'bg-red-100 text-red-800',
            purple: 'bg-purple-100 text-purple-800',
            gray: 'bg-gray-100 text-gray-800',
        };

        const colorClass = colorClasses[config.color] || colorClasses.gray;

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`} title={config.description}>
                {config.label}
            </span>
        );
    };

    return (
        <AdminLayout>
            <AdminBreadcrumb items={[{ label: 'Quản lý đơn hàng', href: '/admin/orders' }, { label: `Đơn ${order.order_number}` }]} />
            <div className="container mx-auto py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-pink-700">Chi tiết đơn hàng</h1>
                    <button
                        onClick={() => setShowShippingModal(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <FontAwesomeIcon icon={faTruck} />
                        Tạo vận chuyển
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="mb-4 space-y-2">
                        <div><strong>Mã đơn:</strong> <span className="ml-2">{order.order_number}</span></div>
                        <div><strong>Khách hàng:</strong> <span className="ml-2">{order.user ? `${order.user.name} (${order.user.email})` : 'Khách vãng lai'}</span></div>
                        <div className="flex items-center gap-2">
                            <strong>Trạng thái:</strong>
                            {getStatusBadge(order.status, 'order')}
                        </div>
                        <div className="flex items-center gap-2">
                            <strong>Thanh toán:</strong>
                            {getStatusBadge(order.payment_status, 'payment')}
                        </div>
                        <div><strong>Ngày đặt:</strong> <span className="ml-2">{order.placed_at ? new Date(order.placed_at).toLocaleString('vi-VN') : ''}</span></div>
                        <div><strong>Tổng tiền:</strong> <span className="ml-2 text-pink-600 font-semibold">{(order.total_cents / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></div>
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

                    {/* Shipping Information */}
                    {order.shippings && order.shippings.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-lg font-bold mb-4 text-indigo-700">Thông tin vận chuyển</h2>
                            <div className="space-y-4">
                                {order.shippings.map((shipping) => (
                                    <div key={shipping.id} className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <strong className="text-gray-700">Mã vận đơn:</strong>
                                                <span className="ml-2 font-mono text-indigo-600">{shipping.tracking_code}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <strong className="text-gray-700">Trạng thái:</strong>
                                                {getStatusBadge(shipping.status, 'shipping')}
                                            </div>
                                            <div>
                                                <strong className="text-gray-700">Loại:</strong>
                                                <span className="ml-2">{shipping.shipping_type === 'external' ? 'Đơn vị bên ngoài' : 'Nội bộ'}</span>
                                            </div>
                                            <div>
                                                <strong className="text-gray-700">Đơn vị vận chuyển:</strong>
                                                <span className="ml-2">
                                                    {shipping.shipping_provider?.name ||
                                                     (shipping.staff?.user?.name ? `Nhân viên: ${shipping.staff.user.name}` : 'N/A')}
                                                </span>
                                            </div>
                                            <div>
                                                <strong className="text-gray-700">Khối lượng:</strong>
                                                <span className="ml-2">{shipping.weight_kg} kg</span>
                                            </div>
                                            <div>
                                                <strong className="text-gray-700">Phí vận chuyển:</strong>
                                                <span className="ml-2 text-indigo-600 font-semibold">
                                                    {(shipping.shipping_fee_cents / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </span>
                                            </div>
                                            {shipping.notes && (
                                                <div className="col-span-2">
                                                    <strong className="text-gray-700">Ghi chú:</strong>
                                                    <p className="ml-2 text-gray-600 italic">{shipping.notes}</p>
                                                </div>
                                            )}
                                            <div className="col-span-2 text-sm text-gray-500">
                                                <strong>Ngày tạo:</strong> {new Date(shipping.created_at).toLocaleString('vi-VN')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <Link href="/admin/orders" className="text-pink-600 hover:underline">← Quay lại danh sách đơn hàng</Link>
                </div>
            </div>

            {/* Shipping Modal */}
            {showShippingModal && (
                <CreateShippingModal
                    orderId={order.id}
                    onClose={() => setShowShippingModal(false)}
                    onSuccess={handleShippingSuccess}
                />
            )}
       </AdminLayout>
    );
}
