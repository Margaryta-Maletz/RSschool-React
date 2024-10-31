import { ICharacter, IPeople, initialPeople } from '../models/people';

const BASE_URL = 'https://swapi.dev/api/people/';

class People {
  static getCharacter(id: number): Promise<ICharacter> {
    const url = `${BASE_URL}/${id}`;

    return fetch(url).then(
      (res) => res.json(),
        () => initialPeople
    );
  }

  static getPeople(search: string | null): Promise<IPeople> {
    const url = search ? `${BASE_URL}/?search=${search}&page=1` : BASE_URL;

    return fetch(url).then(
      (res) => res.json(),
      () => initialPeople
    );
  }
}

export default People;
