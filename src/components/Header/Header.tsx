export type HeaderProps = {
  header: string;
};

const Header = ({ header }: HeaderProps) => {
  return (
    <>
      <h1 className="font-mono font-bold text-xl mb-1" data-testid="header">
        {header}
      </h1>
    </>
  );
};

export default Header;
