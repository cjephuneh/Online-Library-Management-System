import React from "react";

import Header from "../Header/Header";

interface Props {
  children: JSX.Element;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};
