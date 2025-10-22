<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
// Fortify references removed; provider left for other auth views (Breeze)

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        if (class_exists('Laravel\\Fortify\\Fortify')) {
            \Laravel\Fortify\Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
            \Laravel\Fortify\Fortify::createUsersUsing(CreateNewUser::class);
        }
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        // Register login view; if Fortify exists use its Feature flags, otherwise
        // provide safe fallbacks.
        $canResetPassword = false;
        $canRegister = \Illuminate\Support\Facades\Route::has('register');

        if (class_exists('Laravel\\Fortify\\Features')) {
            $canResetPassword = \Laravel\Fortify\Features::enabled(\Laravel\Fortify\Features::resetPasswords());
            $canRegister = \Laravel\Fortify\Features::enabled(\Laravel\Fortify\Features::registration());
        }

        // Always register the view with safe computed flags
        if (class_exists('Laravel\\Fortify\\Fortify')) {
            \Laravel\Fortify\Fortify::loginView(fn(Request $request) => Inertia::render('auth/login', [
                'canResetPassword' => $canResetPassword,
                'canRegister' => $canRegister,
                'status' => $request->session()->get('status'),
            ]));
        }

        if (class_exists('Laravel\\Fortify\\Fortify')) {
            \Laravel\Fortify\Fortify::resetPasswordView(fn(Request $request) => Inertia::render('auth/reset-password', [
                'email' => $request->email,
                'token' => $request->route('token'),
            ]));
        }

        if (class_exists('Laravel\\Fortify\\Fortify')) {
            \Laravel\Fortify\Fortify::requestPasswordResetLinkView(fn(Request $request) => Inertia::render('auth/forgot-password', [
                'status' => $request->session()->get('status'),
            ]));
        }

        if (class_exists('Laravel\\Fortify\\Fortify')) {
            \Laravel\Fortify\Fortify::verifyEmailView(fn(Request $request) => Inertia::render('auth/verify-email', [
                'status' => $request->session()->get('status'),
            ]));
        }

        if (class_exists('Laravel\\Fortify\\Fortify')) {
            \Laravel\Fortify\Fortify::registerView(fn() => Inertia::render('auth/register'));
            \Laravel\Fortify\Fortify::confirmPasswordView(fn() => Inertia::render('auth/confirm-password'));
        }
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        // Two-factor authentication fully removed

        RateLimiter::for('login', function (Request $request) {
            // use 'email' as default username field
            $throttleKey = Str::transliterate(Str::lower($request->input('email')) . '|' . $request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }
}
