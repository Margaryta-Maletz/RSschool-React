import style from './Card.module.scss';
import { FC } from 'react';
import { Countries } from '../types/types.ts';

const Card: FC<Countries> = (props) => {
  const { wrapper } = style;

  return (
    <div className={wrapper}>
      <h3> {props.name.common} </h3>
      <div> {props.region}</div>
      <div> {props.population}</div>
      <div>
        <img src={props.flags.svg} alt={props.flags.alt ?? 'flag'} width={50} />
      </div>
    </div>
  );
};

export default Card;
