
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSent(true);
        // Thực tế sẽ gửi form về backend tại đây
    }

    return (
        <>
            <Header />
            <div className="max-w-2xl mx-auto py-10 px-4">
                <Head title="Liên hệ" />
                <h1 className="text-3xl font-bold mb-4">Liên hệ</h1>
                {sent ? (
                    <div className="p-4 bg-green-100 text-green-700 rounded mb-4">Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-semibold">Họ tên</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Email</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Nội dung</label>
                            <textarea name="message" value={form.message} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={4} required />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-pink-600 text-white rounded">Gửi liên hệ</button>
                    </form>
                )}
            </div>
            <Footer />
        </>
    );
}
