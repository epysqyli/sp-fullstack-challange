import { ReactElement } from "react";
import FlightResult from "./FlightResult";

interface Props {
  flights: Array<any>;
}

const StopoverFlights = ({ flights }: Props): ReactElement => {
  return (
    <div>
      <h2 className='text-center text-3xl font-medium text-slate-700'>Stopover flights</h2>
      <h3 className='my-5 text-2xl pl-2 underline underline-offset-2'>First leg</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-3'>
        {flights["first_flights"].map((flight) => (
          <FlightResult flight={flight} key={flight.id} />
        ))}
      </div>
      <h3 className='my-5 text-2xl pl-2 underline underline-offset-2'>Last leg</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-3'>
        {flights["last_flights"].map((flight) => (
          <FlightResult flight={flight} key={flight.id} />
        ))}
      </div>
    </div>
  );
};

export default StopoverFlights;
