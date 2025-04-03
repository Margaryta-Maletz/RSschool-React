import { ChangeEvent } from 'react';
import style from './ControlBar.module.scss';
import Filter from '../filter/Filter.tsx';
import Search from '../search/Search.tsx';
import Sort from '../sort/Sort.tsx';

type ControlBarProps = {
  regions: Set<string>;
  handleRegionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSortKeyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrderChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function ControlBar({
  regions,
  handleRegionChange,
  handleSearchChange,
  handleSortKeyChange,
  handleSortOrderChange,
}: ControlBarProps) {
  const { wrapper } = style;

  return (
    <div className={wrapper}>
      <Filter regions={regions} handleRegionChange={handleRegionChange} />
      <Search handleSearchChange={handleSearchChange} />
      <Sort
        handleSortKeyChange={handleSortKeyChange}
        handleSortOrderChange={handleSortOrderChange}
      />
    </div>
  );
}

export default ControlBar;
