import { ReactElement } from "react";
import LayoutProps from "../interfaces/LayoutProps";

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <>
      <header></header>
      <main className='py-10'>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
