import React from 'react';

interface BreadcrumbProps {
    items: { name: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            {items.map((item, idx) => (
                <span key={item.name} className="flex items-center">
                    {item.href ? (
                        <a href={item.href} className="hover:text-pink-600 font-medium">
                            {item.name}
                        </a>
                    ) : (
                        <span className="font-semibold text-pink-600">{item.name}</span>
                    )}
                    {idx < items.length - 1 && <span className="mx-2">/</span>}
                </span>
            ))}
        </nav>
    );
}
