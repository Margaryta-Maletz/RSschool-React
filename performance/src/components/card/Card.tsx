import style from './Card.module.scss';
import { FC, memo } from 'react';
import { Country } from '../types/types.ts';

type CardProps = Country & {
  onClick: () => void;
  isVisited: boolean;
};

const Card: FC<CardProps> = memo(
  ({
    isVisited,
    onClick,
    name: { common },
    region,
    population,
    flags: { svg, alt },
  }) => {
    const { wrapper, visited } = style;

    return (
      <div
        className={`${wrapper} ${isVisited ? visited : ''}`}
        onClick={onClick}
      >
        <h3> {common} </h3>
        <div> {region}</div>
        <div> {population}</div>
        <div>
          <img src={svg} alt={alt ?? 'flag'} width={50} />
        </div>
      </div>
    );
  }
);

/*const Card: FC<CardProps> = ({
  isVisited,
  onClick,
  name: { common },
  region,
  population,
  flags: { svg, alt },
}) => {
  const { wrapper, visited } = style;

  return (
    <div className={`${wrapper} ${isVisited ? visited : ''}`} onClick={onClick}>
      <h3> {common} </h3>
      <div> {region}</div>
      <div> {population}</div>
      <div>
        <img src={svg} alt={alt ?? 'flag'} width={50} />
      </div>
    </div>
  );
};*/

export default Card;
