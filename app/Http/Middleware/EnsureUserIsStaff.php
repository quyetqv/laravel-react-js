<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsStaff
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user || $user->role !== 'staff') {
            return redirect('/staff/login');
        }

        if (!$user->staff || !$user->staff->is_active) {
            Auth::logout();
            return redirect('/staff/login')->with('error', 'Tài khoản nhân viên của bạn đã bị vô hiệu hóa.');
        }

        return $next($request);
    }
}
