import React from 'react';

const menuItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/products' },
    { name: 'Giới thiệu', href: '/about' },
    { name: 'Liên hệ', href: '/contact' },
];

export default function Menu() {
    return (
        <nav className="bg-white shadow mb-4">
            <ul className="flex space-x-6 px-8 py-4 text-lg font-semibold text-pink-600">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <a href={item.href} className="hover:text-pink-800 transition-colors duration-200">
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
