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

  private static function get_direct_flights(string $departure_code, string $arrival_code): Collection
  {
    return self::where('departure_code', $departure_code)
      ->where('arrival_code', $arrival_code)
      ->orderBy('price', 'asc')->get();
  }

  private static function get_stopover_flights(string $departure_code, string $arrival_code): array
  {
    $flights_to_arrival = self::where('arrival_code', $arrival_code)
      ->whereNot('departure_code', $departure_code)->orderBy('price', 'asc')->get();
    $stopover_airports = $flights_to_arrival->pluck('departure_code')->unique()->toArray();

    $flights_to_stopover = self::whereIn('arrival_code', $stopover_airports)->where('departure_code', $departure_code)
      ->orderBy('price', 'asc')->get();

    if ($flights_to_stopover->isNotEmpty() && $flights_to_arrival->isNotEmpty()) {
      return [
        'first_flights' => $flights_to_stopover,
        'last_flights' => $flights_to_arrival
      ];
    }
  }

  public static function get_double_stopover_flights(string $departure_code, string $arrival_code): array
  {
    $flights_to_arrival = self::where('arrival_code', $arrival_code)->whereNot('departure_code', $departure_code)->get();
    $second_stopover_airports = $flights_to_arrival->pluck('departure_code')->unique()->toArray();

    $flights_to_second_stopover = self::whereIn('arrival_code', $second_stopover_airports)
      ->whereNotIn('departure_code', [$departure_code, $arrival_code])->orderBy('price', 'asc')->get();
    $first_stopover_airports = $flights_to_second_stopover->whereNotIn('departure_code', $second_stopover_airports)
      ->pluck('departure_code')->unique()->toArray();

    $flights_to_first_stopover = self::whereIn('arrival_code', $first_stopover_airports)
      ->where('departure_code', $departure_code)->orderBy('price', 'asc')->get();

    if (
      $flights_to_first_stopover->isNotEmpty() && $flights_to_second_stopover->isNotEmpty() && $flights_to_arrival->isNotEmpty()
    ) {
      return [
        'first_flights' => $flights_to_first_stopover,
        'intermediate_flights' => $flights_to_second_stopover,
        'last_flights' => $flights_to_arrival
      ];
    }
  }

  public static function search(string $departure_code, string $arrival_code): array
  {
    return [
      'direct_flights' => self::get_direct_flights($departure_code, $arrival_code),
      'stopover_flights' => self::get_stopover_flights($departure_code, $arrival_code),
      'double_stopover_flights' => self::get_double_stopover_flights($departure_code, $arrival_code)
    ];
  }
}
