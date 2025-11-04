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

import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function CheckoutForm() {
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        payment_method: 'cod',
    });
    type FormErrors = {
        name?: string;
        phone?: string;
        email?: string;
        address?: string;
        payment_method?: string;
        [key: string]: string | undefined;
    };
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        router.post('/cart/checkout', form, {
            onSuccess: () => setSuccess(true),
            onError: (err) => setErrors(err),
        });
    };

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
                    {success ? (
                        <div className="mb-4 text-green-700 font-semibold bg-green-100 p-4 rounded">Đặt hàng thành công! Đơn hàng của bạn đã được ghi nhận.</div>
                    ) : (
                        <form onSubmit={handleCheckout} className="space-y-4">
                            <div>
                                <label className="block font-medium">Họ tên người đặt hàng</label>
                                <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Số điện thoại</label>
                                <input name="phone" value={form.phone} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
                                {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Email</label>
                                <input name="email" type="email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
                                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Địa chỉ nhận hàng</label>
                                <textarea name="address" value={form.address} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
                                {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                            </div>
                            <div>
                                <label className="block font-medium">Hình thức thanh toán</label>
                                <select name="payment_method" value={form.payment_method} onChange={handleChange} className="border rounded px-3 py-2 w-full" disabled>
                                    <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded font-bold shadow"
                            >
                                Đặt hàng
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
