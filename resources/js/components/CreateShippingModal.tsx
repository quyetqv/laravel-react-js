import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTruck, faUser, faWeightHanging, faStickyNote, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface ShippingProvider {
    id: number;
    name: string;
    code: string;
    description: string;
    base_price_cents: number;
    price_per_kg_cents: number;
}

interface Staff {
    id: number;
    name: string;
    position: string;
    phone: string;
}

interface Props {
    orderId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateShippingModal({ orderId, onClose, onSuccess }: Props) {
    const [shippingType, setShippingType] = useState<'internal' | 'external'>('external');
    const [providers, setProviders] = useState<ShippingProvider[]>([]);
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null);
    const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
    const [weightKg, setWeightKg] = useState<string>('1.0');
    const [notes, setNotes] = useState<string>('');
    const [calculatedFee, setCalculatedFee] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    useEffect(() => {
        if (weightKg && parseFloat(weightKg) > 0) {
            calculateFee();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shippingType, selectedProviderId, weightKg]);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/admin/orders/${orderId}/shipping/data`);
            setProviders(response.data.providers);
            setStaffList(response.data.staff);
            if (response.data.providers.length > 0) {
                setSelectedProviderId(response.data.providers[0].id);
            }
            if (response.data.staff.length > 0) {
                setSelectedStaffId(response.data.staff[0].id);
            }
        } catch (error) {
            console.error('Error loading data:', error);
            alert('Không thể tải dữ liệu. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const calculateFee = async () => {
        if (!weightKg || parseFloat(weightKg) <= 0) return;

        try {
            const response = await axios.post('/admin/shipping/calculate-fee', {
                shipping_type: shippingType,
                shipping_provider_id: shippingType === 'external' ? selectedProviderId : null,
                weight_kg: parseFloat(weightKg),
            });
            setCalculatedFee(response.data.fee_vnd);
        } catch (error) {
            console.error('Error calculating fee:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post(`/admin/orders/${orderId}/shipping`, {
                shipping_type: shippingType,
                shipping_provider_id: shippingType === 'external' ? selectedProviderId : null,
                staff_id: shippingType === 'internal' ? selectedStaffId : null,
                weight_kg: parseFloat(weightKg),
                notes,
            });

            if (response.data.success) {
                alert('Tạo vận chuyển thành công!');
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error('Error creating shipping:', error);
            const message = (error as {response?: {data?: {message?: string}}}).response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
            alert(message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6">
                    <p>Đang tải...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FontAwesomeIcon icon={faTruck} className="text-indigo-600" />
                        Tạo vận chuyển
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Shipping Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại vận chuyển
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="shippingType"
                                    value="external"
                                    checked={shippingType === 'external'}
                                    onChange={() => setShippingType('external')}
                                    className="w-4 h-4 text-indigo-600"
                                />
                                <span>Đơn vị bên ngoài</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="shippingType"
                                    value="internal"
                                    checked={shippingType === 'internal'}
                                    onChange={() => setShippingType('internal')}
                                    className="w-4 h-4 text-indigo-600"
                                />
                                <span>Nhân viên nội bộ</span>
                            </label>
                        </div>
                    </div>

                    {/* Provider Selection */}
                    {shippingType === 'external' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                                Đơn vị vận chuyển
                            </label>
                            <select
                                value={selectedProviderId || ''}
                                onChange={(e) => setSelectedProviderId(parseInt(e.target.value))}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="">Chọn đơn vị vận chuyển</option>
                                {providers.map((provider) => (
                                    <option key={provider.id} value={provider.id}>
                                        {provider.name} - {provider.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Staff Selection */}
                    {shippingType === 'internal' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                Nhân viên giao hàng
                            </label>
                            <select
                                value={selectedStaffId || ''}
                                onChange={(e) => setSelectedStaffId(parseInt(e.target.value))}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="">Chọn nhân viên</option>
                                {staffList.map((staff) => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.name} - {staff.position} ({staff.phone})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Weight */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FontAwesomeIcon icon={faWeightHanging} className="mr-2" />
                            Khối lượng (kg)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            value={weightKg}
                            onChange={(e) => setWeightKg(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Calculated Fee */}
                    {calculatedFee !== null && (
                        <div className="bg-indigo-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faMoneyBillWave} />
                                    Phí vận chuyển dự kiến:
                                </span>
                                <span className="text-xl font-bold text-indigo-600">
                                    {calculatedFee.toLocaleString('vi-VN')} đ
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
                            Ghi chú
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Nhập ghi chú về vận chuyển..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Đang tạo...' : 'Tạo vận chuyển'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
