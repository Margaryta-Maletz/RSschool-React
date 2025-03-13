export interface Countries {
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
