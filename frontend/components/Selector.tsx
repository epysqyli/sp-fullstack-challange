import { ReactElement } from "react";
import { MapPin } from "react-feather";
import type Airport from "../interfaces/Airport";

interface Props {
  departure: Airport | undefined;
  arrival: Airport | undefined;
}

const Selector = ({ departure, arrival }: Props): ReactElement => {
  return (
    <div className='flex justify-between items-start border-b-2 pb-5 px-1 text-sm'>
      <div className='w-2/5'>
        {departure ? (
          <div>
            <div className='text-amber-800 font-medium'>{departure.name}</div>
            <div className='text-sm text-slate-500'>{departure.code}</div>
          </div>
        ) : (
          <div>no departure</div>
        )}
      </div>

      <MapPin size={36} strokeWidth={1.5} className='text-amber-700' />

      <div className='w-2/5 text-right'>
        {arrival ? (
          <div>
            <div className='text-amber-800 font-medium'>{arrival.name}</div>
            <div className='text-sm text-slate-500'>{arrival.code}</div>
          </div>
        ) : (
          <div>no arrival</div>
        )}
      </div>
    </div>
  );
};

export default Selector;
