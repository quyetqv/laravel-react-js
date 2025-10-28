<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        // Cho phép nếu là admin@example.com hoặc có is_admin = true
        if (! $user || (! ($user->email === 'admin@example.com') && ! ($user->is_admin ?? false))) {
            // Nếu là API hoặc request expects JSON thì trả về 403, còn lại redirect về home
            if ($request->expectsJson()) {
                abort(403, 'Bạn không có quyền truy cập khu vực này.');
            }
            return Redirect::route('home');
        }
        return $next($request);
    }
}
