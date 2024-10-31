export interface ICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

export interface IPeople {
  count: number;
  next: string;
  previous: string | null;
  results: ICharacter[];
}

export const initialPeople = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};