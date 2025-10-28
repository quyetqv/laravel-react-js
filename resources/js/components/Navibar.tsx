import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import type { SharedData } from '@/types';

export default function Navibar() {
    const { auth } = usePage<SharedData>().props;
    return (
        <header className="bg-pink-600 text-white shadow-lg mb-2">
            <div className="container mx-auto flex justify-between items-center py-3 px-6">
                <div className="text-2xl font-bold tracking-wide">ShopLogo</div>
                <div className="space-x-4">
                    {auth && auth.user ? (
                        <Link href="/logout" method="post" as="button" className="hover:underline">Đăng xuất</Link>
                    ) : (
                        <>
                            <Link href="/login" className="hover:underline">Đăng nhập</Link>
                            <Link href="/register" className="hover:underline">Đăng ký</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
