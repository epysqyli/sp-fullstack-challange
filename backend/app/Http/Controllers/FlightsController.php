<?php

namespace App\Http\Controllers;

use App\Models\Flight;


class FlightsController extends Controller
{
  public function search($departure_code, $arrival_code)
  {
    $results = Flight::search($departure_code, $arrival_code);
    return response()->json($results);
  }
}
