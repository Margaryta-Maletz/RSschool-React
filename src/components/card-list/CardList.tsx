import { ICharacter } from '../../models/people';
import './CardList.css';
import Card from '../card';

type CardListProps = {
  list: ICharacter[];
  setId: (id: number) => void;
};

function CardList({ list, setId }: CardListProps) {
  return (
    <div className="list-container">
      {list.map((item) => (
        <Card key={item.name} item={item} setId={setId} />
      ))}
    </div>
  );
}

export default CardList;
