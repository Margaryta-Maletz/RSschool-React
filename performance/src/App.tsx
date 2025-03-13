import { useEffect, useState } from 'react';
import './App.css';
import { Countries } from './components/types/types.ts';
import { getCountries } from './components/utils/getCountries.ts';
import Card from './components/card/Card.tsx';

function App() {
  const [countries, setCountries] = useState<Countries[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCountries();
      setCountries(data);
    })();
  }, []);
  return (
    <div>
      {countries.map(({ name, region, population, flags }, ind) => (
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
