import React from 'react';
import { usePage } from '@inertiajs/react';

const menuItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/products' },
    { name: 'Giới thiệu', href: '/about' },
    { name: 'Liên hệ', href: '/contact' },
];

const Menu: React.FC = () => {
    const { cartCount } = usePage().props as { cartCount?: number };
    return (
        <nav className="bg-white shadow mb-4 flex p-4 items-center">
            <ul className="flex space-x-6 px-8 py-4 text-lg font-semibold text-pink-600 items-center">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <a href={item.href} className="hover:text-pink-800 transition-colors duration-200">
                            {item.name}
                        </a>
                    </li>
                ))}

            </ul>

            <div className="ml-auto">
                <a href="/cart" className="relative hover:text-pink-800 transition-colors duration-200 flex items-center">
                    {/* Cart SVG icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L7.5 15.75A2.25 2.25 0 009.664 18h7.672a2.25 2.25 0 002.164-1.728l1.622-7.298A1.125 1.125 0 0019.125 7.5H5.25m0 0L4.125 3.835A1.125 1.125 0 003.014 3H2.25m3 4.5h13.5" />
                    </svg>
                    {cartCount && cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                            {cartCount}
                        </span>
                    )}
                </a>
            </div>
        </nav>
    );
}

export default Menu;
