import { ChangeEvent } from 'react';

type SortProps = {
  handleSortKeyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrderChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function Sort({ handleSortKeyChange, handleSortOrderChange }: SortProps) {
  return (
    <div>
      <label>Sorting by:</label>
      <select onChange={handleSortKeyChange}>
        <option value="name">name</option>
        <option value="population">population</option>
      </select>

      <label>Sort Order:</label>
      <select onChange={handleSortOrderChange}>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
    </div>
  );
}

export default Sort;
