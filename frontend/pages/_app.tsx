import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextPageLayout from "../types/NextPageLayout";
import { ReactElement, ReactNode } from "react";

interface AppPropsLayout extends AppProps {
  Component: NextPageLayout;
}

function MyApp({ Component, pageProps }: AppPropsLayout) {
  const pageWithoutLayout = (page: ReactElement): ReactNode => page;
  const pageWithLayout = Component.getLayout;
  const getPage = pageWithLayout ?? pageWithoutLayout;

  return getPage(<Component {...pageProps} />);
}

export default MyApp;
