<?php

use App\Http\Controllers\AirportsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/airports', [AirportsController::class, 'index']);
