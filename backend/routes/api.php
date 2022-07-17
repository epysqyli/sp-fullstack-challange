<?php

use App\Http\Controllers\AirportsController;
use App\Http\Controllers\FlightsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['cors'])->group(function () {
  Route::get('/airports', [AirportsController::class, 'index']);
  Route::get('/flights', [FlightsController::class, 'index']);
  Route::get('/search/departure={departure_code}-arrival={arrival_code}', [FlightsController::class, 'search']);
});
