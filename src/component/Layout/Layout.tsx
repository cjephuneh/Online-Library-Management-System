import React from "react";

import Header from "../Header/Header";
import { Footer } from "../Footer/Footer";

interface Props {
  children: JSX.Element;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};
