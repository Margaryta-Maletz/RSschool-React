import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICharacter, IPeople } from '../models/people';

const BASE_URL = 'https://swapi.py4e.com/api/people';
// 'https://swapi.dev/api/people';

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
