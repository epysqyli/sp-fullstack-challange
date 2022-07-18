import { ReactElement } from "react";
import Flight from "../interfaces/Flight";

interface Props {
  flight: Flight;
}

const FlightResult = ({ flight }: Props): ReactElement => {
  return (
    <div className='rounded-md p-3 text-slate-700 bg-white'>
      <div className='font-medium'>
        {flight.departure_code} - {flight.arrival_code}
      </div>
      <div>{Number(flight.price).toFixed(2)} &#8364;</div>
    </div>
  );
};

export default FlightResult;
