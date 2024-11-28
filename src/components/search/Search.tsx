import { KeyboardEventHandler, useRef } from 'react';
import './Search.css';

type HeaderProps = {
  defaultValue: string;
  handleClick: (search: string) => void;
};

function Search({ defaultValue, handleClick }: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      handleClick(inputRef.current?.value ?? '');
    }
  };

  return (
    <div>
      <input type="text" ref={inputRef} defaultValue={defaultValue} onKeyDown={handleKeyDown} />
      <button className="button" type="button" onClick={() => handleClick(inputRef.current?.value ?? '')}>
        Search
      </button>
    </div>
  );
}

export default Search;
