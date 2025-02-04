import { KeyboardEventHandler, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ICharacter } from '../../models/people';
import './CardList.css';
import Card from '../card';

type CardListProps = {
  list: ICharacter[];
};

function CardList({ list }: CardListProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  const handleClick: MouseEventHandler<HTMLElement> = (event) => {
    if (event.target === event.currentTarget) {
      navigate(`/?page=${page}`);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        navigate(`/?page=${page}`);
      }
    }
  };

  return (
    <section
      role="button"
      data-testid="section"
      tabIndex={0}
      className="list-container"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {list.map((item) => (
        <Card key={item.name} item={item} />
      ))}
    </section>
  );
}

export default CardList;
