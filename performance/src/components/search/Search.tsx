import { ChangeEvent } from 'react';

type SearchProps = {
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function Search({ handleSearchChange }: SearchProps) {
  return (
    <label>
      Search country
      <input
        type="text"
        onChange={handleSearchChange}
        placeholder="Insert name"
      />
    </label>
  );
}

export default Search;
