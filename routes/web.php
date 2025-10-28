<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AdminProductController;


Route::get('/', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// About page
Route::get('/about', function () {
    return Inertia::render('About', [
        'frameworkVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('about');

// Contact page
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Cart routes
Route::get('/cart', [CartController::class, 'get'])->name('cart.get');
Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');
Route::post('/cart/remove/{productId}', [CartController::class, 'removeFromCart'])->name('cart.remove');
Route::get(('/cart/checkout'), [CartController::class, 'checkoutForm'])->name('cart.checkout.form');
Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');


// Middleware kiểm tra admin

// $adminMiddleware = ['auth', 'verified', 'is_admin'];
$adminMiddleware = ['auth', 'verified'];
Route::middleware($adminMiddleware)->prefix('admin')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('admin/AdminDashboard'))->name('admin.dashboard');
    Route::get('/products', [AdminProductController::class, 'index'])->name('admin.products');
    Route::get('/users', fn() => Inertia::render('admin/AdminUsers'))->name('admin.users');
    Route::get('/reports', fn() => Inertia::render('admin/AdminReports'))->name('admin.reports');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
