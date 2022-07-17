import type { AxiosResponse } from "axios";
import type { GetServerSideProps } from "next";
import type Airport from "../interfaces/Airport";
import { ReactElement, useState } from "react";
import Layout from "../layouts/Layout";
import NextPageLayout from "../types/NextPageLayout";
import AirportElement from "../components/AirportElement";
import Selector from "../components/Selector";
import { getAirports } from "../lib/apiCalls";

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

  return (
    <div className='w-5/6 mx-auto'>
      <h1 className='text-4xl text-center mb-14 font-medium text-slate-700'>Flyaway.now</h1>
      <Selector departure={departure} arrival={arrival} />
    </div>
  );
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
