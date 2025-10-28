
import { Head } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
    return (
        <>
            <Header />
            <div className="max-w-2xl mx-auto py-10 px-4">
                <Head title="Giới thiệu" />
                <h1 className="text-3xl font-bold mb-4">Giới thiệu</h1>
                <p className="mb-4 text-gray-700">
                    Đây là website bán hàng mẫu sử dụng Laravel + React + Inertia. Dự án này được xây dựng nhằm mục đích học tập, demo các tính năng hiện đại như SPA, quản lý sản phẩm, giỏ hàng, quản trị, v.v.
                </p>
                <p className="text-gray-600">
                    Nếu bạn có thắc mắc hoặc muốn hợp tác, hãy liên hệ với chúng tôi qua trang Liên hệ.
                </p>
            </div>

            <Footer />
        </>
    );
}
