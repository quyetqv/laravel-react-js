<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Order Status
    |--------------------------------------------------------------------------
    */
    'order_status' => [
        'pending' => [
            'label' => 'Chờ xử lý',
            'color' => 'yellow',
            'description' => 'Đơn hàng đang chờ xác nhận',
        ],
        'processing' => [
            'label' => 'Đang xử lý',
            'color' => 'blue',
            'description' => 'Đơn hàng đang được xử lý',
        ],
        'completed' => [
            'label' => 'Hoàn thành',
            'color' => 'green',
            'description' => 'Đơn hàng đã hoàn thành',
        ],
        'cancelled' => [
            'label' => 'Đã hủy',
            'color' => 'red',
            'description' => 'Đơn hàng đã bị hủy',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Payment Status
    |--------------------------------------------------------------------------
    */
    'payment_status' => [
        'pending' => [
            'label' => 'Chờ thanh toán',
            'color' => 'yellow',
            'description' => 'Đang chờ thanh toán',
        ],
        'paid' => [
            'label' => 'Đã thanh toán',
            'color' => 'green',
            'description' => 'Đã thanh toán thành công',
        ],
        'failed' => [
            'label' => 'Thất bại',
            'color' => 'red',
            'description' => 'Thanh toán thất bại',
        ],
        'refunded' => [
            'label' => 'Đã hoàn tiền',
            'color' => 'purple',
            'description' => 'Đã hoàn tiền',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Shipping Status
    |--------------------------------------------------------------------------
    */
    'shipping_status' => [
        'pending' => [
            'label' => 'Chờ xử lý',
            'color' => 'yellow',
            'description' => 'Chờ bắt đầu vận chuyển',
            'next_status' => ['shipping', 'cancelled'],
        ],
        'shipping' => [
            'label' => 'Đang giao hàng',
            'color' => 'blue',
            'description' => 'Đang trong quá trình vận chuyển',
            'next_status' => ['delivered', 'failed'],
        ],
        'delivered' => [
            'label' => 'Đã giao hàng',
            'color' => 'green',
            'description' => 'Đã giao hàng thành công',
            'next_status' => [],
        ],
        'failed' => [
            'label' => 'Giao thất bại',
            'color' => 'red',
            'description' => 'Giao hàng thất bại',
            'next_status' => ['shipping', 'cancelled'],
        ],
        'cancelled' => [
            'label' => 'Đã hủy',
            'color' => 'gray',
            'description' => 'Đã hủy vận chuyển',
            'next_status' => [],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Shipping Type
    |--------------------------------------------------------------------------
    */
    'shipping_type' => [
        'internal' => [
            'label' => 'Giao hàng nội bộ',
            'description' => 'Nhân viên nội bộ giao hàng',
        ],
        'external' => [
            'label' => 'Đơn vị bên ngoài',
            'description' => 'Sử dụng đơn vị vận chuyển bên ngoài',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Staff Position
    |--------------------------------------------------------------------------
    */
    'staff_position' => [
        'delivery' => [
            'label' => 'Nhân viên giao hàng',
            'description' => 'Giao hàng cho khách',
        ],
        'warehouse' => [
            'label' => 'Nhân viên kho',
            'description' => 'Quản lý kho hàng',
        ],
        'manager' => [
            'label' => 'Quản lý',
            'description' => 'Quản lý toàn bộ',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Role
    |--------------------------------------------------------------------------
    */
    'user_role' => [
        'customer' => [
            'label' => 'Khách hàng',
            'description' => 'Người dùng thông thường',
        ],
        'staff' => [
            'label' => 'Nhân viên',
            'description' => 'Nhân viên công ty',
        ],
        'admin' => [
            'label' => 'Quản trị viên',
            'description' => 'Quản trị hệ thống',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Payment Method
    |--------------------------------------------------------------------------
    */
    'payment_method' => [
        'cod' => [
            'label' => 'Thanh toán khi nhận hàng (COD)',
            'description' => 'Thanh toán bằng tiền mặt khi nhận hàng',
        ],
        'bank_transfer' => [
            'label' => 'Chuyển khoản ngân hàng',
            'description' => 'Chuyển khoản qua ngân hàng',
        ],
        'momo' => [
            'label' => 'Ví MoMo',
            'description' => 'Thanh toán qua ví điện tử MoMo',
        ],
        'vnpay' => [
            'label' => 'VNPay',
            'description' => 'Thanh toán qua cổng VNPay',
        ],
    ],
];
