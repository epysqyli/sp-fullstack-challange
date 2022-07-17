import { ReactElement, useState } from "react";
import { Globe } from "react-feather";
import type Airport from "../interfaces/Airport";

interface Props {
  airport: Airport;
}

const AirportElement = ({ airport }: Props): ReactElement => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const baseStyle =
    "bg-white border border-slate-200 p-3 text-slate-800 rounded-md cursor-pointer group transition-colors shadow-sm shadow-slate-100 hover:shadow-md hover:shadow-slate-200";
  const selectedStyle =
    "bg-zinc-100 border border-amber-600 p-3 text-slate-800 rounded-md cursor-pointer group transition-colors shadow-inner";

  const baseCodeStyle = "p-1 bg-zinc-200 rounded-md group-hover:bg-zinc-600 group-hover:text-white";
  const selectedCodeStyle = "p-1 rounded-md bg-zinc-600 text-white";

  const toggleSelectStyle = () => (isSelected ? setIsSelected(false) : setIsSelected(true));

  const handleClick = () => {
    toggleSelectStyle();
  };

  return (
    <div className={isSelected ? selectedStyle : baseStyle} onClick={handleClick}>
      <div className='flex justify-between'>
        <div>{airport.name}</div>
        <div className={isSelected ? selectedCodeStyle : baseCodeStyle}>{airport.code}</div>
      </div>
      <div className='flex items-start gap-x-2'>
        <Globe size={20} strokeWidth={1.5} className="text-slate-500" />
        <div className='text-sm text-slate-500'>
          {airport.lat} - {airport.lng}
        </div>
      </div>
    </div>
  );
};

export default AirportElement;
