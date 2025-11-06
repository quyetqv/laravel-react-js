<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StaffAuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('staff/StaffLogin');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->filled('remember'))) {
            $user = Auth::user();

            // Kiểm tra xem user có role staff không
            if ($user->role !== 'staff' || !$user->staff) {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'Tài khoản này không có quyền truy cập nhân viên.',
                ])->onlyInput('email');
            }

            // Kiểm tra staff có active không
            if (!$user->staff->is_active) {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'Tài khoản nhân viên đã bị vô hiệu hóa.',
                ])->onlyInput('email');
            }

            $request->session()->regenerate();
            return redirect()->intended('/staff/dashboard');
        }

        return back()->withErrors([
            'email' => 'Thông tin đăng nhập không chính xác.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/staff/login');
    }
}
