import { ReactElement } from "react";
import Airport from "../interfaces/Airport";

interface Props {
  airport: Airport;
}

const AirportElement = ({ airport }: Props): ReactElement => {
  return (
    <div className='bg-white border border-slate-200 p-3 text-slate-800 rounded-md cursor-pointer group transition-colors shadow-sm shadow-slate-100 hover:shadow-md hover:shadow-slate-200'>
      <div className='flex justify-between'>
        <div>{airport.name}</div>
        <div className='p-1 bg-zinc-200 rounded-md group-hover:bg-zinc-600 group-hover:text-white'>
          {airport.code}
        </div>
      </div>
      <div className="text-sm text-slate-500">
        {airport.lat} - {airport.lng}
      </div>
    </div>
  );
};

export default AirportElement;
