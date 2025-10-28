import React from 'react';
import { Link } from '@inertiajs/react';

interface AdminBreadcrumbProps {
    items?: Array<{ label: string; href?: string }>;
}

const defaultItems = [
    { label: 'Admin Dashboard', href: '/admin/dashboard' },
];

export default function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
    const crumbs = items && items.length > 0 ? [...defaultItems, ...items] : defaultItems;
    return (
        <nav className="text-sm text-gray-500 mb-4 p-4" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                {crumbs.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                        {item.href ? (
                            <Link href={item.href} className="hover:underline text-pink-600">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-700">{item.label}</span>
                        )}
                        {idx < crumbs.length - 1 && (
                            <span className="mx-2">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
