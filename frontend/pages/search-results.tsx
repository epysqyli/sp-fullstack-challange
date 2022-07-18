import type { AxiosResponse } from "axios";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type Airport from "../interfaces/Airport";
import { ReactElement, useState } from "react";
import Layout from "../layouts/Layout";
import NextPageLayout from "../types/NextPageLayout";
import Selector from "../components/Selector";
import { searchFlights, getAirport } from "../lib/apiCalls";
import DirectFlights from "../components/DirectFlights";
import StopoverFlights from "../components/StopoverFlights";
import DoubleStopoverFlights from "../components/DoubleStopoverFlights";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const departureCode = String(context.query.departure);
  const arrivalCode = String(context.query.arrival);
  const resp: AxiosResponse<Array<Airport>> = await searchFlights(departureCode, arrivalCode);
  const departureAirportResp = await getAirport(departureCode);
  const arrivalAirportResp = await getAirport(arrivalCode);
  return {
    props: { results: resp.data, departure: departureAirportResp.data, arrival: arrivalAirportResp.data }
  };
};

interface Props {
  results: any;
  departure: Airport;
  arrival: Airport;
}

const SearchResults: NextPageLayout<Props> = ({ results, departure, arrival }: Props): ReactElement => {
  return (
    <div className='w-5/6 lg:w-2/3 xl:w-1/2 mx-auto'>
      <div className='mx-auto md:w-4/6 lg:w-2/3 md:my-16'>
        <Selector departure={departure} arrival={arrival} />
      </div>

      <div className='mt-20'>
        <DirectFlights flights={results["direct_flights"]} />
      </div>

      <Link href='/'>
        <div className='mt-10 w-fit p-3 mx-auto text-center my-3 rounded-md border-2 border-amber-500 bg-white shadow-md shadow-slate-300 cursor-pointer hover:bg-slate-500 hover:text-white active:shadow-inner active:bg-slate-600'>
          Start another search
        </div>
      </Link>

      <div className='mt-20'>
        <StopoverFlights flights={results["stopover_flights"]} />
      </div>

      <div className='mt-20'>
        <DoubleStopoverFlights flights={results["double_stopover_flights"]} />
      </div>
    </div>
  );
};

SearchResults.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default SearchResults;
