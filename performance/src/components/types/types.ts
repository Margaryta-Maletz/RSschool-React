export interface Country {
  name: {
    common: string;
  };
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}

export interface CountryWithId extends Country {
  id: string;
}
