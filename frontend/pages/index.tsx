import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import Airport from "../interfaces/Airport";
import Layout from "../layouts/Layout";
import { getAirports } from "../lib/apiCalls";
import NextPageLayout from "../types/NextPageLayout";

export const getServerSideProps: GetServerSideProps = async () => {
  const resp: AxiosResponse<Array<Airport>> = await getAirports();
  const airports: Array<Airport> = resp.data;

  return { props: { airports } };
};

interface Props {
  airports: Array<Airport>;
}

const Index: NextPageLayout<Props> = ({ airports }: Props) => {
  return <div></div>;
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
