import { ChangeEvent } from 'react';

type FilterProps = {
  regions: Set<string>;
  handleRegionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function Filter({ regions, handleRegionChange }: FilterProps) {
  return (
    <label>
      Filter region
      <select onChange={handleRegionChange}>
        <option value="">All regions</option>
        {[...regions].map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Filter;
