import * as React from "react";

export type HeaderProps = {
  header: string;
};

const Header = ({ header }: HeaderProps) => {
  return (
    <>
      <h1
        className="font-mono font-bold text-xl mb-1"
        data-testid="header"
        role="banner"
      >
        {header}
      </h1>
    </>
  );
};

export default Header;
