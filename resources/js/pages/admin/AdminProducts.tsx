import React from 'react';
import Navibar from '@/components/Navibar';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

export default function AdminProducts() {
    return (
        <>
            <Navibar />
            <Menu />
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold text-pink-700 mb-6">Quản lý sản phẩm</h1>
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between mb-4">
                        <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Thêm sản phẩm</button>
                        <input type="text" placeholder="Tìm kiếm sản phẩm..." className="border px-3 py-2 rounded" />
                    </div>
                    {/* Danh sách sản phẩm sẽ render ở đây */}
                    <table className="w-full text-left border">
                        <thead>
                            <tr className="bg-pink-100">
                                <th className="p-2">ID</th>
                                <th className="p-2">Tên sản phẩm</th>
                                <th className="p-2">Giá</th>
                                <th className="p-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Ví dụ dữ liệu tĩnh */}
                            <tr>
                                <td className="p-2">1</td>
                                <td className="p-2">Sản phẩm A</td>
                                <td className="p-2">100,000₫</td>
                                <td className="p-2">
                                    <button className="text-blue-600 hover:underline mr-2">Sửa</button>
                                    <button className="text-red-600 hover:underline">Xóa</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2">2</td>
                                <td className="p-2">Sản phẩm B</td>
                                <td className="p-2">200,000₫</td>
                                <td className="p-2">
                                    <button className="text-blue-600 hover:underline mr-2">Sửa</button>
                                    <button className="text-red-600 hover:underline">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}
