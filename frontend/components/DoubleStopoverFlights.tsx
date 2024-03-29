import { ReactElement } from "react";
import FlightResult from "./FlightResult";

interface Props {
  flights: Array<any>;
}

const DoubleStopoverFlights = ({ flights }: Props): ReactElement => {
  if (
    flights["first_flights"] !== undefined &&
    flights["intermediate_flights"] !== undefined &&
    flights["last_flights"] !== undefined
  )
    return (
      <div className='border-b pb-10'>
        <h2 className='text-center text-3xl font-medium text-slate-700'>Double Stopover flights</h2>

        <h3 className='mt-10 mb-5 text-2xl pl-5 underline underline-offset-2'>First leg</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-3'>
          {flights["first_flights"].map((flight) => (
            <div className='border rounded-md' key={flight.id}>
              <FlightResult flight={flight} />
            </div>
          ))}
        </div>

        <h3 className='mt-10 mb-5 text-2xl pl-5 underline underline-offset-2'>Intermediate leg</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-3'>
          {flights["intermediate_flights"].map((flight) => (
            <div className='border rounded-md' key={flight.id}>
              <FlightResult flight={flight} />
            </div>
          ))}
        </div>

        <h3 className='mt-10 mb-5 text-2xl pl-5 underline underline-offset-2'>Last leg</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-3'>
          {flights["last_flights"].map((flight) => (
            <div className='border rounded-md' key={flight.id}>
              <FlightResult flight={flight} />
            </div>
          ))}
        </div>
      </div>
    );

  return <></>;
};

export default DoubleStopoverFlights;
