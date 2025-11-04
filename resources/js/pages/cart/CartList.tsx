import Footer from '@/components/Footer';
// import { Button } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import Banner from '@/components/Banner';
import Menu from '@/components/Menu';
import Navibar from '@/components/Navibar';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@headlessui/react';
import { Input } from '@/components/ui/input';

interface CartListProps {
    items: Array<{
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
    }>;
    cart: Record<number, number>; // product_id => quantity
}

export default function CartList({ items, cart }: CartListProps) {
    function removeFromCart(productId: number) {
        // Logic to remove the product from the cart
        console.log(`Xóa sản phẩm ${productId} khỏi giỏ hàng`);
        // You can implement the actual removal logic here, e.g., making an API call
        router.post(`/cart/remove/${productId}`);
    }

    function updateCart() {
        // Logic to update the cart
        console.log('Cập nhật giỏ hàng');
        // You can implement the actual update logic here, e.g., making an API call
        router.post('/cart/update', { cart });
    }

    return (
         <>
            <Head title="Giỏ hàng" />
            <Navibar />
            <Menu />
            <Banner />

            <div className="container mx-auto py-6">
                <Breadcrumb items={[{ name: 'Trang chủ', href: '/' }, { name: 'Giỏ hàng' }]} />
                <div className="max-w-3xl mx-auto py-10">
                    <Head title="Hiển thị danh sách sản phẩm trong giỏ hàng" />
                    <h1 className="text-3xl font-bold mb-4">Giỏ hàng của bạn</h1>
                    <div className="mb-4 text-gray-700">Danh sách sản phẩm bạn đã thêm vào giỏ hàng.</div>
                    {/* Add cart items display logic here */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <ul>
                            {items.map(item => (
                                <li key={item.id} className="border-b py-4">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">{item.title}</span>
                                        <span className="text-gray-600">{item.price} đ</span>
                                    </div>
                                    <div className="text-sm text-gray-500">Số lượng: {cart[item.id]}</div>
                                    <Input type="number" min="1" defaultValue={cart[item.id]} className="mt-2 w-20" />
                                    <Button onClick={() => removeFromCart(item.id)} className="mt-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Xóa khỏi giỏ hàng</Button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={updateCart} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Cập nhật giỏ hàng</Button>
                            <Button onClick={() => router.get('/cart/checkout')} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Thanh toán</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
