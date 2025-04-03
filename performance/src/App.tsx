import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import './App.css';
import { CountryWithId } from './components/types/types.ts';
import { getCountries } from './components/utils/getCountries.ts';
import CardList from './components/card--list/CardList.tsx';
import ControlBar from './components/control-bar/ControlBar.tsx';

function App() {
  const [countries, setCountries] = useState<CountryWithId[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchName, setSearchName] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const regions = new Set(countries.map((el) => el.region));

  /*  const filteredData = countries
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
    });*/

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
      setCountries(
        data.map((item, index) => ({ ...item, id: index.toString() }))
      );
    })();
  }, []);

  return (
    <div>
      <ControlBar
        regions={regions}
        handleRegionChange={handleRegionChange}
        handleSearchChange={handleSearchChange}
        handleSortKeyChange={handleSortKeyChange}
        handleSortOrderChange={handleSortOrderChange}
      />
      <CardList filteredData={filteredData} />
    </div>
  );
}

export default App;
