import { KeyboardEventHandler, useRef, useState } from 'react';
import './Header.css';

type HeaderProps = {
  defaultValue: string;
  handleClick: (search: string) => void;
};

function Header({ defaultValue, handleClick }: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      handleClick(inputRef.current?.value ?? '');
    }
  };

  if (hasError) {
    throw new Error('Test Error boundary!');
  }

  return (
    <div className="header-container">
      <input type="text" ref={inputRef} defaultValue={defaultValue} onKeyDown={handleKeyDown} />
      <button className="button" type="button" onClick={() => handleClick(inputRef.current?.value ?? '')}>
        Search
      </button>
      <button className="button error" type="button" onClick={() => setHasError(true)}>
        Throw Error
      </button>
    </div>
  );
}

export default Header;
