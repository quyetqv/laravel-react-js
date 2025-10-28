<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        // Nếu là admin thì chuyển hướng về admin dashboard
        if ($user && (($user->email === 'admin@example.com') || ($user->isAdmin ?? false))) {
            return redirect()->intended(route('admin.dashboard'));
        }

        if ($user) {
            return redirect('/dashboard');
        }
        return $next($request);
    }
}
