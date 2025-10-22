import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Banner from '@/components/Banner';
import Menu from '@/components/Menu';
import Navibar from '@/components/Navibar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

interface Product {
    id: number;
    title: string;
    price?: number;
    price_cents?: number;
    description?: string;
    image_url?: string;
}

interface ProductsPageProps extends PageProps {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        next_page_url: string | null;
        prev_page_url: string | null;
    };
}

export default function Welcome({ products }: ProductsPageProps) {
    return (
        <>
            <Head title="Cửa hàng sản phẩm" />
            <Navibar />
            <Menu />
            <Banner />
            <div className="container mx-auto py-6">
                <Breadcrumb items={[{ name: 'Trang chủ', href: '/' }, { name: 'Sản phẩm' }]} />
                <h1 className="text-3xl font-bold text-pink-600 mb-6">Danh sách sản phẩm</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.data.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                            <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray-100 flex items-center justify-center">
                                <img
                                    src={product.image_url || 'https://source.unsplash.com/400x400/?product'}
                                    alt={product.title}
                                    className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded shadow">Mới</span>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <h2 className="text-lg font-bold text-gray-800 mb-2 truncate" title={product.title}>{product.title}</h2>
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description || 'Sản phẩm chất lượng, giá tốt, giao hàng toàn quốc.'}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xl font-bold text-pink-600">
                                        {typeof product.price === 'number' && !isNaN(product.price)
                                            ? product.price.toLocaleString()
                                            : (typeof product.price_cents === 'number' && !isNaN(product.price_cents)
                                                ? (product.price_cents / 100).toLocaleString()
                                                : 'Liên hệ')
                                        }₫
                                    </span>
                                    <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200">
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-10 space-x-2">
                    {products.prev_page_url && (
                        <Link
                            href={products.prev_page_url}
                            className="px-5 py-2 bg-white border border-pink-300 text-pink-600 rounded-lg shadow hover:bg-pink-50 font-semibold"
                        >
                            ← Trang trước
                        </Link>
                    )}
                    <span className="px-5 py-2 bg-pink-100 text-pink-700 rounded-lg font-bold shadow">
                        Trang {products.current_page} / {products.last_page}
                    </span>
                    {products.next_page_url && (
                        <Link
                            href={products.next_page_url}
                            className="px-5 py-2 bg-white border border-pink-300 text-pink-600 rounded-lg shadow hover:bg-pink-50 font-semibold"
                        >
                            Trang sau →
                        </Link>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
