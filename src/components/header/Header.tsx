import { useState } from 'react';
import './Header.css';
import Search from '../search';

type HeaderProps = {
  defaultValue: string;
  handleClick: (search: string) => void;
};

function Header({ defaultValue, handleClick }: HeaderProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('Test Error boundary!');
  }

  return (
    <div className="header-container">
      <Search defaultValue={defaultValue} handleClick={handleClick} />
      <button className="button error" type="button" onClick={() => setHasError(true)}>
        Throw Error
      </button>
    </div>
  );
}

export default Header;
