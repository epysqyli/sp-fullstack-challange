<?php

namespace App\Http\Controllers;

use App\Models\Flight;


class FlightsController extends Controller
{
  public function index()
  {
    $flights = Flight::all();
    return response()->json($flights);
  }
}
