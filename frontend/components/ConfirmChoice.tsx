import Link from "next/link";
import type { ReactElement } from "react";
import { Search, Trash2 } from "react-feather";

interface Props {
  departureCode: string;
  arrivalCode: string;
  resetChoices(): void;
}

const ConfirmChoice = ({ departureCode, arrivalCode, resetChoices }: Props): ReactElement => {
  return (
    <div className='flex items-center justify-around'>
      <Link href={{ pathname: "/search-results", query: { departure: departureCode, arrival: arrivalCode } }}>
        <div className='border-b border-amber-800 px-3 py-2 mx-auto cursor-pointer hover:bg-slate-100 active:bg-slate-200'>
          <Search size={32} strokeWidth={1.5} className='w-min mx-auto text-amber-800' />
          <div className='text-center mt-2 text-amber-800'>Search for flights</div>
        </div>
      </Link>
      <div
        onClick={resetChoices}
        className='border-b px-3 py-2 mx-auto cursor-pointer hover:bg-slate-100 active:bg-slate-200'
      >
        <Trash2 size={32} strokeWidth={1.5} className='w-min mx-auto text-slate-500' />
        <div className='text-center mt-2 text-slate-500'>reset choices</div>
      </div>
    </div>
  );
};

export default ConfirmChoice;
