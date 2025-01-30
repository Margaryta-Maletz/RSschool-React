import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICharacter, IPeople } from '../models/people';

const BASE_URL = 'https://swapi.py4e.com/api/people';
// 'https://swapi.dev/api/people';

/*
class People {
  static getCharacter(id: number): Promise<ICharacter> {
    const url = `${BASE_URL}/${id}`;

    return fetch(url).then(
      (res) => res.json(),
      () => initialPeople
    );
  }

  static getPeople(search: string | null, page: number): Promise<IPeople> {
    const url = search ? `${BASE_URL}/?search=${search}&page=${page}` : `${BASE_URL}/?page=${page}`;

    return fetch(url).then(
      (res) => res.json(),
      () => initialPeople
    );
  }
}

export default People;
*/

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacter: builder.query<ICharacter, string | undefined>({
      query: (id) => (id ? `/${id}` : ''),
    }),
    getPeople: builder.query<IPeople, { search: string | null; page: string }>({
      query: ({ search, page }) => (search ? `/?search=${search}&page=${page}` : `/?page=${page}`),
    }),
  }),
});

export const { useGetCharacterQuery, useGetPeopleQuery } = peopleApi;
