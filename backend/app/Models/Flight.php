<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
  private const PRICE_PER_DISTANCE_UNIT = 20;

  private function get_distance(): float
  {
    $departure_airport = Airport::where('code', $this->departure_code)->first();
    $arrival_airport = Airport::where('code', $this->arrival_code)->first();
    $lat_squared_dist =  pow((floatval($arrival_airport->lat) - floatval($departure_airport->lat)), 2);
    $lng_squared_dist = pow((floatval($arrival_airport->lng) - floatval($departure_airport->lng)), 2);
    return sqrt($lat_squared_dist + $lng_squared_dist);
  }

  public function get_price(): float
  {
    $price = $this->get_distance() * self::PRICE_PER_DISTANCE_UNIT;
    return round($price, 2);
  }
}
