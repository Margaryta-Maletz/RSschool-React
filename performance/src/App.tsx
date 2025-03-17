import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import './App.css';
import { Countries } from './components/types/types.ts';
import { getCountries } from './components/utils/getCountries.ts';
import Card from './components/card/Card.tsx';

function App() {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchName, setSearchName] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const regions = new Set(countries.map((el) => el.region));

  const filteredData = useMemo(
    () =>
      countries
        .filter((item) => {
          const matchesRegion =
            selectedRegion === '' || item.region === selectedRegion;
          const matchesName =
            searchName === '' ||
            item.name.common.toLowerCase().includes(searchName.toLowerCase());
          return matchesRegion && matchesName;
        })
        .sort((a, b) => {
          if (sortKey === 'name') {
            const comparison = a.name.common.localeCompare(b.name.common);
            return sortOrder === 'asc' ? comparison : -comparison;
          } else if (sortKey === 'population') {
            const comparison = a.population - b.population;
            return sortOrder === 'asc' ? comparison : -comparison;
          }
          return 0;
        }),
    [countries, selectedRegion, searchName, sortKey, sortOrder]
  );

  const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const region = event.target.value;
    setSelectedRegion(region);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setSearchName(name);
  };

  const handleSortKeyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    setSortKey(key);
  };

  const handleSortOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value;
    setSortOrder(order);
  };

  useEffect(() => {
    (async () => {
      const data = await getCountries();
      setCountries(data);
    })();
  }, []);

  /*  useEffect(
    () => filterAndSortData(),
    [countries, selectedRegion, searchName, sortKey, sortOrder]
  );*/

  return (
    <div>
      <div className="block-wrapper">
        <label>
          Filter region
          <select value={selectedRegion} onChange={handleRegionChange}>
            <option value="">All regions</option>
            {[...regions].map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
        <label>
          Search country
          <input
            type="text"
            value={searchName}
            onChange={handleSearchChange}
            placeholder="Insert name"
          />
        </label>
        <div>
          <label>Sorting by:</label>
          <select value={sortKey} onChange={handleSortKeyChange}>
            <option value="name">name</option>
            <option value="population">population</option>
          </select>

          <label>Sort Order:</label>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </div>
      </div>
      <div className="list">
        {filteredData.map(({ name, region, population, flags }, ind) => {
          const isVisited = visitedCountries.includes(name.common);
          return (
            <Card
              key={`${name}${ind}`}
              name={name}
              region={region}
              population={population}
              flags={flags}
              onClick={() => {
                if (!isVisited) {
                  setVisitedCountries((countries) => [
                    ...countries,
                    name.common,
                  ]);
                }
              }}
              isVisited={isVisited}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
