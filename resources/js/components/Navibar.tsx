import React from 'react';

export default function Navibar() {
    return (
        <header className="bg-pink-600 text-white shadow-lg mb-2">
            <div className="container mx-auto flex justify-between items-center py-3 px-6">
                <div className="text-2xl font-bold tracking-wide">ShopLogo</div>
                <div className="space-x-4">
                    <a href="/login" className="hover:underline">Đăng nhập</a>
                    <a href="/register" className="hover:underline">Đăng ký</a>
                </div>
            </div>
        </header>
    );
}
