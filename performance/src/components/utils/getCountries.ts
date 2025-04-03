import { Country } from '../types/types.ts';

const url = 'https://restcountries.com/v3.1/all';

export const getCountries = async (): Promise<Country[]> => {
  const data = await fetch(url).then(
    (data) => data.json(),
    (error) => {
      console.error('Error fetching data:', error.message);
      return [];
    }
  );

  return data;
};
