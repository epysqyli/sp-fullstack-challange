import type { AxiosResponse } from "axios";
import type { GetServerSideProps } from "next";
import type Airport from "../interfaces/Airport";
import { ReactElement, useState } from "react";
import Layout from "../layouts/Layout";
import NextPageLayout from "../types/NextPageLayout";
import AirportElement from "../components/AirportElement";
import Selector from "../components/Selector";
import { getAirports } from "../lib/apiCalls";
import ConfirmChoice from "../components/ConfirmChoice";

export const getServerSideProps: GetServerSideProps = async () => {
  const resp: AxiosResponse<Array<Airport>> = await getAirports();
  const airports: Array<Airport> = resp.data;

  return { props: { airports } };
};

interface Props {
  airports: Array<Airport>;
}

const Index: NextPageLayout<Props> = ({ airports }: Props) => {
  const [departure, setDeparture] = useState<Airport>();
  const [arrival, setArrival] = useState<Airport>();

  const resetChoices = () => {
    setDeparture(undefined);
    setArrival(undefined);
  };

  return (
    <div className='w-5/6 lg:w-2/3 xl:w-1/2 mx-auto'>
      <div className='mx-auto md:w-4/6 lg:w-1/2 md:my-16'>
        <Selector departure={departure} arrival={arrival} />
      </div>

      <div className='mt-10 mb-7 text-center text-2xl underline underline-offset-3'>Flying From</div>
      {departure === undefined ? (
        <div className='mb-10 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-3'>
          {airports.map((airport) => (
            <div key={airport.id}>
              <AirportElement airport={airport} selectedAirport={departure} setAirport={setDeparture} />
            </div>
          ))}
        </div>
      ) : (
        <div className='my-10 md:w-2/3 xl:w-1/3 mx-auto'>
          <AirportElement airport={departure} selectedAirport={departure} setAirport={setDeparture} />
        </div>
      )}

      {departure ? (
        <div className='mt-10 mb-7 text-center text-2xl underline underline-offset-3'>Flying To</div>
      ) : null}
      {departure && arrival === undefined ? (
        <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-x-3'>
          {airports
            .filter((airport) => airport.id !== departure.id)
            .map((airport) => (
              <div key={airport.id}>
                <AirportElement airport={airport} selectedAirport={arrival} setAirport={setArrival} />
              </div>
            ))}
        </div>
      ) : departure && arrival ? (
        <div className='my-10 md:w-2/3 xl:w-1/3 mx-auto'>
          <AirportElement airport={arrival} selectedAirport={arrival} setAirport={setArrival} />
        </div>
      ) : null}

      {departure && arrival ? (
        <div className='mt-20 w-2/3 mx-auto'>
          <ConfirmChoice
            departureCode={departure.code}
            arrivalCode={arrival.code}
            resetChoices={resetChoices}
          />
        </div>
      ) : null}
    </div>
  );
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
