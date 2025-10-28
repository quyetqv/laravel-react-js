import Footer from '@/components/Footer';
import { Button } from '@headlessui/react';
import { Head,router } from '@inertiajs/react';
import Banner from '@/components/Banner';
import Menu from '@/components/Menu';
import Navibar from '@/components/Navibar';
import Breadcrumb from '@/components/Breadcrumb';

interface ProductDetailProps {
    product: {
        id: number;
        title: string;
        slug: string;
        description: string;
        price_cents: number;
        price: number;
        stock: number;
        is_active: boolean;
        metadata?: {
            image?: string;
            // add more metadata fields here as needed
        };
        // add more fields if needed
    };
}

export default function ProductDetail({ product }: ProductDetailProps) {

    function addToCart() {
        // Logic to add the product to the cart
        console.log(`Thêm sản phẩm ${product.title} vào giỏ hàng`);
        router.post('/cart/add', {
            product_id: product.id,
            quantity: 1,
        });

    }

    return (
         <>
            <Head title="Cửa hàng sản phẩm" />
            <Navibar />
            <Menu />
            <Banner />

            <div className="container mx-auto py-6">
                <Breadcrumb items={[{ name: 'Trang chủ', href: '/' }, { name: 'Chi tiết Sản phẩm' }]} />
                <div className="max-w-3xl mx-auto py-10">
                    <Head title={product.title} />
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <div className="mb-4 text-gray-700">{product.description}</div>
                    <div className="mb-2 font-semibold">
                        Giá: <span className="text-blue-600">{typeof product.price === 'number' ? product.price.toLocaleString() : 0} đ</span>
                    </div>
                    <div className="mb-2">Tồn kho: {product.stock}</div>
                    <img
                        src={product.metadata?.image || '/storage/products/default.png'}
                        alt={product.title}
                        className="object-cover h-80 w-80 group-hover:scale-105 transition-transform duration-300"
                    />

                    <Button onClick={addToCart} className="mt-6 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
}
