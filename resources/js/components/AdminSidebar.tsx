
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faBox,
  faUsers,
  faTruck,
  faChartLine,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

const adminMenu = [
  { label: 'Dashboard', href: '/admin', icon: faTachometerAlt },
  { label: 'Sản phẩm', href: '/admin/products', icon: faBox },
  { label: 'Người dùng', href: '/admin/users', icon: faUsers },
  { label: 'Đơn hàng', href: '/admin/orders', icon: faFileAlt },
  { label: 'Shipping', href: '/admin/shippings', icon: faTruck },
  { label: 'Báo cáo', href: '/admin/reports', icon: faChartLine },
];

export default function AdminSidebar() {
  const { url } = usePage();
  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col">
      <div className="p-6 font-bold text-xl text-indigo-700 border-b">Quản trị</div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {adminMenu.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 transition-colors ` +
                  (url.startsWith(item.href) ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-700')
                }
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
