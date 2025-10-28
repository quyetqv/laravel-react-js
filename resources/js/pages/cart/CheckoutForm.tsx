import Footer from '@/components/Footer';
// import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import Banner from '@/components/Banner';
import Menu from '@/components/Menu';
import Navibar from '@/components/Navibar';
import Breadcrumb from '@/components/Breadcrumb';

// interface CartListProps {
//     items: Array<{
//         id: number;
//         title: string;
//         slug: string;
//         description: string;
//         price_cents: number;
//         price: number;
//         stock: number;
//         is_active: boolean;
//         metadata?: {
//             image?: string;
//             // add more metadata fields here as needed
//         };
//         // add more fields if needed
//     }>;
//     cart: Record<number, number>; // product_id => quantity
// }

export default function CartList() {
    // function removeFromCart(productId: number) {
    //     // Logic to remove the product from the cart
    //     console.log(`Xóa sản phẩm ${productId} khỏi giỏ hàng`);
    //     // You can implement the actual removal logic here, e.g., making an API call
    //     router.post(`/cart/remove/${productId}`);
    // }

    // function updateCart() {
    //     // Logic to update the cart
    //     console.log('Cập nhật giỏ hàng');
    //     // You can implement the actual update logic here, e.g., making an API call
    // }

    return (
         <>
            <Head title="Checkout" />
            <Navibar />
            <Menu />
            <Banner />

            <div className="container mx-auto py-6">
                <Breadcrumb items={[{ name: 'Trang chủ', href: '/' }, { name: 'Thanh toán' }]} />
                <div className="max-w-3xl mx-auto py-10">
                    <Head title="Tiến hành thanh toán đơn hàng" />
                    <h1 className="text-3xl font-bold mb-4">Thanh toán</h1>
                    <div className="mb-4 text-gray-700">Màn hình thanh toán.</div>

                    {/* <div className="bg-white shadow rounded-lg p-6">
                        <ul>
                            {items.map(item => (
                                <li key={item.id} className="border-b py-4">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">{item.title}</span>
                                        <span className="text-gray-600">{item.price} đ</span>
                                    </div>
                                    <div className="text-sm text-gray-500">Số lượng: {cart[item.id]}</div>
                                    <Button onClick={() => removeFromCart(item.id)} className="mt-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Xóa khỏi giỏ hàng</Button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={updateCart} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Cập nhật giỏ hàng</Button>
                            <Button onClick={() => router.post('/cart/checkout')} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Thanh toán</Button>
                        </div>
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
}
