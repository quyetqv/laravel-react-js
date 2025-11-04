import React, { useState } from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb';

import { usePage, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';

type Product = {
    id: number;
    title: string;
    price_cents: number;
    is_active: boolean;
};

type Pagination = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string|null; label: string; active: boolean }>;
};

type PageProps = {
    products: { data: Product[] } & Pagination;
    filters: { search?: string; is_active?: string; perPage?: string };
};

export default function AdminProducts() {
    const { products, filters } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [isActive, setIsActive] = useState(filters.is_active || '');
    const [perPage, setPerPage] = useState(filters.perPage || '10');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/products', { search, is_active: isActive, perPage }, { preserveState: true });
    };

    return (
        <AdminLayout>
            <AdminBreadcrumb items={[{ label: 'Quản lý sản phẩm' }]} />
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold text-pink-700 mb-6">Quản lý sản phẩm</h1>
                <div className="bg-white rounded-xl shadow p-6">
                    <form className="flex flex-wrap gap-4 mb-4 items-end" onSubmit={handleFilter}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="border px-3 py-2 rounded"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <select className="border px-3 py-2 rounded" value={isActive} onChange={e => setIsActive(e.target.value)}>
                            <option value="">Tất cả trạng thái</option>
                            <option value="1">Đang bán</option>
                            <option value="0">Ngừng bán</option>
                        </select>
                        <select className="border px-3 py-2 rounded" value={perPage} onChange={e => setPerPage(e.target.value)}>
                            <option value="10">10/trang</option>
                            <option value="20">20/trang</option>
                            <option value="50">50/trang</option>
                        </select>
                        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Lọc</button>
                        <button type="button" className="bg-gray-200 px-4 py-2 rounded ml-2" onClick={() => { setSearch(''); setIsActive(''); setPerPage('10'); router.get('/admin/products'); }}>Đặt lại</button>
                        <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 ml-auto">Thêm sản phẩm</button>
                    </form>
                    <table className="w-full text-left border">
                        <thead>
                            <tr className="bg-pink-100">
                                <th className="p-2">ID</th>
                                <th className="p-2">Tên sản phẩm</th>
                                <th className="p-2">Giá</th>
                                <th className="p-2">Trạng thái</th>
                                <th className="p-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.length === 0 && (
                                <tr><td colSpan={5} className="text-center py-4">Không có sản phẩm nào</td></tr>
                            )}
                            {products.data.map(product => (
                                <tr key={product.id}>
                                    <td className="p-2">{product.id}</td>
                                    <td className="p-2">{product.title}</td>
                                    <td className="p-2">{(product.price_cents / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td className="p-2">{product.is_active ? 'Đang bán' : 'Ngừng bán'}</td>
                                    <td className="p-2">
                                        <button className="text-blue-600 hover:underline mr-2">Sửa</button>
                                        <button className="text-red-600 hover:underline">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Phân trang */}
                    <div className="flex justify-center mt-4 gap-1 flex-wrap">
                        {products.links && products.links.map((link, idx) => (
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
