import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ICharacter } from '../../models/people';
import './Card.css';

type CardProps = {
  item: ICharacter;
};

function Card({ item }: CardProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  const handleClick = (url: string) => {
    const id = Number((url.match(/\d+/g) ?? [0])[0]);

    navigate(`/${id}?page=${page}`);
  };
  return (
    <button type="button" className="card" onClick={() => handleClick(item.url)}>
      <div>
        <strong>name: </strong>
        {item.name}
      </div>
      <div>
        <strong>gender: </strong>
        {item.gender}
      </div>
      <div>
        <strong>birth year: </strong>
        {item.birth_year}
      </div>
      <div>
        <strong>height: </strong>
        {item.height}
      </div>
      <div>
        <strong>mass: </strong>
        {item.mass}
      </div>
    </button>
  );
}

export default Card;
