import { useState } from 'react';
import Card from '../card/Card.tsx';
import { CountryWithId } from '../types/types.ts';

type CardListProps = {
  filteredData: CountryWithId[];
};

function CardList({ filteredData }: CardListProps) {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  return (
    <div>
      {filteredData.map(({ id, name, region, population, flags }) => {
        const isVisited = visitedCountries.includes(name.common);
        return (
          <Card
            key={id}
            name={name}
            region={region}
            population={population}
            flags={flags}
            onClick={() => {
              if (!isVisited) {
                setVisitedCountries((countries) => [...countries, name.common]);
              }
            }}
            isVisited={isVisited}
          />
        );
      })}
    </div>
  );
}

export default CardList;
