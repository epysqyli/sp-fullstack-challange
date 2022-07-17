import { ReactElement } from "react";
import Layout from "../layouts/Layout";
import NextPageLayout from "../types/NextPageLayout";

const Index: NextPageLayout = () => {
  return <div></div>;
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
