import { ReactElement } from "react";
import LayoutProps from "../interfaces/LayoutProps";

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <>
      <header>
        <h1 className='text-4xl text-center my-10 font-medium text-slate-700'>Flyaway.now</h1>
      </header>
      <main className='py-7'>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
