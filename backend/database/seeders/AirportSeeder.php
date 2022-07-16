<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Airport;

class AirportSeeder extends Seeder
{
  public function run()
  {
    $airports = [
      ['Milano Malpensa', 'MXP', 45.6301, 8.7255],
      ['Roma Fiumicino', 'FCO', 41.8034, 12.2519],
      ['Paris Charles De Gaulle', 'CDG', 49.0081, 2.5509],
      ['Madrid-Barajas', 'MAD', 40.4983, 3.5676],
      ['Barcelona-El Prat', 'BCN', 42.2974, 2.0833],
      ['London Heathrow', 'LHR', 51.4700, 0.4543],
      ['London Gatwick', 'LGW', 51.1537, 0.1821],
      ['Berlin Schoenefeld', 'BER', 52.3733, 13.5064],
      ['Munich International Aiport', 'MUC', 48.3510, 11.7764],
      ['Amsterdam Airport Schiphol', 'AMS', 52.3105, 4.7683]
    ];

    foreach ($airports as $entry) {
      $airport = new Airport();
      $airport->name = $entry[0];
      $airport->code = $entry[1];
      $airport->lat = $entry[2];
      $airport->lng = $entry[3];
      $airport->save();
    }
  }
}
