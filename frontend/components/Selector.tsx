import { ReactElement } from "react";
import { MapPin } from "react-feather";
import type Airport from "../interfaces/Airport";

interface Props {
  departure: Airport | undefined;
  arrival: Airport | undefined;
}

const Selector = ({ departure, arrival }: Props): ReactElement => {
  return (
    <div className='flex justify-between items-center border-b-2 pb-5 px-1 text-sm'>
      <div className='w-2/5'>
        {departure ? (
          <div>
            <div>{departure.name}</div>
            <div className='text-sm text-slate-500'>{departure.code}</div>
          </div>
        ) : (
          <div>no departure</div>
        )}
      </div>
      <MapPin size={28} strokeWidth={1.5} className='text-slate-700' />
      <div className='w-2/5 text-right'>
        {arrival ? (
          <div>
            <div>{arrival.name}</div>
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
