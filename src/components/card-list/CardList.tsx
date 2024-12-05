import { KeyboardEventHandler, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { ICharacter } from '../../models/people';
import './CardList.css';
import Card from '../card';

type CardListProps = {
  list: ICharacter[];
};

function CardList({ list }: CardListProps) {
  const navigate = useNavigate();

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/');
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        navigate('/');
      }
    }
  };

  return (
    <section role="button" tabIndex={0} className="list-container" onClick={handleClick} onKeyDown={handleKeyDown}>
      {list.map((item) => (
        <Card key={item.name} item={item} />
      ))}
    </section>
  );
}

export default CardList;
