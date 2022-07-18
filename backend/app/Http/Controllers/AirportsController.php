<?php

namespace App\Http\Controllers;

use App\Models\Airport;

class AirportsController extends Controller
{
  public function index()
  {
    $airports = Airport::all();
    return response()->json($airports);
  }

  public function show($code)
  {
    $airport = Airport::where('code', $code)->first();
    return response()->json($airport);
  }
}
