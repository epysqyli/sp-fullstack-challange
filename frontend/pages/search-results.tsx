import type { AxiosResponse } from "axios";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type Airport from "../interfaces/Airport";
import { ReactElement, useState } from "react";
import Layout from "../layouts/Layout";
import NextPageLayout from "../types/NextPageLayout";
import AirportElement from "../components/AirportElement";
import Selector from "../components/Selector";
import { searchFlights, getAirport } from "../lib/apiCalls";
import ConfirmChoice from "../components/ConfirmChoice";

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
      <h1 className='text-4xl text-center mb-14 font-medium text-slate-700'>Flyaway.now</h1>
      <div className='mx-auto md:w-4/6 lg:w-1/2 md:my-16'>
        <Selector departure={departure} arrival={arrival} />
      </div>
    </div>
  );
};

SearchResults.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default SearchResults;
