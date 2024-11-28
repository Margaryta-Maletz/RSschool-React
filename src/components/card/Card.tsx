import { ICharacter } from '../../models/people';
import './Card.css';

type CardProps = {
  item: ICharacter;
  setId: (id: number) => void;
};

function Card({ item, setId }: CardProps) {
  const handleClick = (url: string) => {
    const id = Number((url.match(/\d+/g) ?? [0])[0]);
    setId(id);
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
