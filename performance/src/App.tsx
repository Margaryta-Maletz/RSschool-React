import { ChangeEvent, useEffect, useState } from 'react';
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
  const [filteredData, setFilteredData] = useState(countries);
  const regions = new Set(countries.map((el) => el.region));

  const filterAndSortData = (
    region: string,
    name: string,
    key: string,
    order: string
  ) => {
    const updatedData = countries
      .filter((item) => {
        const matchesRegion = region === '' || item.region === region;
        const matchesName =
          name === '' ||
          item.name.common.toLowerCase().includes(name.toLowerCase());
        return matchesRegion && matchesName;
      })
      .sort((a, b) => {
        if (key === 'name') {
          const comparison = a.name.common.localeCompare(b.name.common);
          return order === 'asc' ? comparison : -comparison;
        } else if (key === 'population') {
          const comparison = a.population - b.population;
          return order === 'asc' ? comparison : -comparison;
        }
        return 0;
      });
    setFilteredData(updatedData);
  };

  const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const region = event.target.value;
    setSelectedRegion(region);
    filterAndSortData(region, searchName, sortKey, sortOrder);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setSearchName(name);
    filterAndSortData(selectedRegion, name, sortKey, sortOrder);
  };

  const handleSortKeyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    setSortKey(key);
    filterAndSortData(selectedRegion, searchName, key, sortOrder);
  };

  // Handle sort order change (asc or desc)
  const handleSortOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value;
    setSortOrder(order);
    filterAndSortData(selectedRegion, searchName, sortKey, order);
  };

  useEffect(() => {
    (async () => {
      const data = await getCountries();
      setCountries(data);
      setFilteredData(data);
    })();
  }, []);

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
      {filteredData.map(({ name, region, population, flags }, ind) => (
        <Card
          key={`${name}${ind}`}
          name={name}
          region={region}
          population={population}
          flags={flags}
        />
      ))}
    </div>
  );
}

export default App;
