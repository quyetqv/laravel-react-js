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
        // Quick guard: allow if user's email is admin@example.com or if a future is_admin field exists
        if (! $user || (! ($user->email === 'admin@example.com') && ! ($user->is_admin ?? false))) {
            return Redirect::route('home');
        }

        return $next($request);
    }
}
