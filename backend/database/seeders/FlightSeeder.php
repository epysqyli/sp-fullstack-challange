<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Flight;
use App\Models\Airport;

class FlightSeeder extends Seeder
{
  private $airports_permutations = [];

  private function combine_airports()
  {
    $codes = Airport::all()->pluck('code')->toArray();
    foreach ($codes as $code) {
      for ($i = 0; $i < count($codes); $i++) {
        if ($codes[$i] != $code) {
          array_push($this->airports_permutations, [$code, $codes[$i]]);
        }
      }
    }

    // remove random items so that not all airports have direct flights
    $keys_to_be_removed = [];
    for ($i = 0; $i < 40; $i++) {
      array_push($keys_to_be_removed, rand(1, count($this->airports_permutations)));
    }

    foreach ($keys_to_be_removed as $key) {
      unset($this->airports_permutations[$key]);
    }
  }

  private function createFlights()
  {
    foreach ($this->airports_permutations as $airports) {
      $flight = new Flight();
      $flight->departure_code = $airports[0];
      $flight->arrival_code = $airports[1];
      $flight->price = $flight->get_price() * rand(75, 125) / 100;
      $flight->save();
    }
  }

  public function run()
  {
    $this->combine_airports();

    // calling createFlights twice to ensure two flights with different price for each airports pair
    $this->createFlights();
    $this->createFlights();
  }
}
