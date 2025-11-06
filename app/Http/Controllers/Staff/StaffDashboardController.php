<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Shipping;

class StaffDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $staff = $user->staff;

        $shippings = Shipping::where('staff_id', $staff->id)
            ->with(['order'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('staff/StaffDashboard', [
            'staff' => [
                'id' => $staff->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $staff->position,
                'phone' => $staff->phone,
            ],
            'shippings' => $shippings,
        ]);
    }
}
