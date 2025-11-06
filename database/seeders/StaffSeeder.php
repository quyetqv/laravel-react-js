<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Staff;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo user cho nhân viên giao hàng
        $user1 = \App\Models\User::create([
            'name' => 'Nguyễn Văn A',
            'email' => 'delivery@example.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        Staff::create([
            'user_id' => $user1->id,
            'phone' => '0901234567',
            'position' => 'delivery',
            'is_active' => true,
        ]);

        // Tạo user cho nhân viên kho
        $user2 = \App\Models\User::create([
            'name' => 'Trần Thị B',
            'email' => 'warehouse@example.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        Staff::create([
            'user_id' => $user2->id,
            'phone' => '0902345678',
            'position' => 'warehouse',
            'is_active' => true,
        ]);

        // Tạo user cho quản lý
        $user3 = \App\Models\User::create([
            'name' => 'Lê Văn C',
            'email' => 'manager@example.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        Staff::create([
            'user_id' => $user3->id,
            'phone' => '0903456789',
            'position' => 'manager',
            'is_active' => true,
        ]);
    }
}
