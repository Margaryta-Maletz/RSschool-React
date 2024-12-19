import { ICharacter, IPeople, initialPeople } from '../models/people';

const BASE_URL = 'https://swapi.py4e.com/api/people';
// 'https://swapi.dev/api/people';

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
