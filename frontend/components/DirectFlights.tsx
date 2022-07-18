import { ReactElement } from "react";
import Flight from "../interfaces/Flight";
import FlightResult from "./FlightResult";

interface Props {
  flights: Array<Flight>;
}

const DirectFlights = ({ flights }: Props): ReactElement => {
  if (flights.length !== 0)
    return (
      <div className='border-b'>
        <h2 className='text-center text-3xl font-medium text-slate-700'>Direct flights</h2>
        <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-3'>
          <div className='border-2 border-teal-200 rounded-md'>
            <FlightResult flight={flights[0]} />
          </div>
          {flights
            .filter((f) => flights[0] !== f)
            .map((flight) => (
              <div className='border rounded-md' key={flight.id}>
                <FlightResult flight={flight} />
              </div>
            ))}
        </div>
      </div>
    );

  return <></>;
};

export default DirectFlights;
