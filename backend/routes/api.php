<?php

use App\Http\Controllers\AirportsController;
use App\Http\Controllers\FlightsController;
use Illuminate\Support\Facades\Route;

Route::get('/airports', [AirportsController::class, 'index']);
Route::get('/flights', [FlightsController::class, 'index']);
