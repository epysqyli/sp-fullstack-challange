import type { ReactElement } from "react";
import { Search, Trash2 } from "react-feather";
import { searchFlights } from "../lib/apiCalls";

interface Props {
  departureCode: string;
  arrivalCode: string;
  resetChoices(): void;
}

const ConfirmChoice = ({ departureCode, arrivalCode, resetChoices }: Props): ReactElement => {
  const handleClick = async () => {
    const resp = await searchFlights(departureCode, arrivalCode);
    console.log(resp.data);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className='border rounded px-3 py-2 w-2/3 mx-auto cursor-pointer hover:bg-slate-100 active:bg-slate-200'
      >
        <Search size={32} strokeWidth={1.5} className='w-min mx-auto text-slate-700' />
        <div className='text-center mt-2 text-slate-700'>Search for flights</div>
      </div>
      <div
        onClick={resetChoices}
        className='border rounded px-3 py-2 w-2/3 mx-auto mt-10 cursor-pointer hover:bg-slate-100 active:bg-slate-200'
      >
        <Trash2 size={32} strokeWidth={1.5} className='w-min mx-auto text-slate-700' />
        <div className='text-center mt-2 text-slate-700'>reset choices</div>
      </div>
    </>
  );
};

export default ConfirmChoice;
