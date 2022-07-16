<?php

use App\Http\Controllers\AirportsController;
use Illuminate\Support\Facades\Route;

Route::get('/airports', [AirportsController::class, 'index']);
