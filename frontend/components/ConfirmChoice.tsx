import type { ReactElement } from "react";
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
    <div>
      <div onClick={handleClick}>Search for flights</div>
      <div onClick={resetChoices}>or reset search</div>
    </div>
  );
};

export default ConfirmChoice;
