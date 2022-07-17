<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
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

  private static function find_all_Connections(string $departure_code, string $arrival_code): Collection
  {
    $from_departure = self::where('departure_code', $departure_code)->get();
    $to_arrival = self::where('arrival_code', $arrival_code)->get();
    return $from_departure->merge($to_arrival);
  }

  public static function get_connecting_flights(string $departure_code, string $arrival_code): Collection
  {
    $flights = self::find_all_Connections($departure_code, $arrival_code);
    $codes = Airport::whereNotIn('code', [$departure_code, $arrival_code])->pluck('code')->toArray();

    $results = new Collection();
    foreach ($codes as $code) {
      $arrivals = ['first_flight' => $flights->where('arrival_code', $code)];
      $departures = ['second_flight' => $flights->where('departure_code', $code)];
      $results->push([$arrivals, $departures]);
    }

    return $results;
  }

  private static function get_direct_flights(string $departure_code, string $arrival_code)
  {
    return self::where('departure_code', $departure_code)
      ->where('arrival_code', $arrival_code)
      ->orderBy('price', 'asc')->get();
  }

  public static function search(string $departure_code, string $arrival_code)
  {
    $direct_flights = self::get_direct_flights($departure_code, $arrival_code);
    $stopover_flights = self::get_connecting_flights($departure_code, $arrival_code);

    return [
      'direct_flights' => $direct_flights,
      'stopover_flights' => $stopover_flights
    ];
  }
}
