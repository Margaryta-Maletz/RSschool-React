import { useDispatch, useSelector } from 'react-redux';
import { ICharacter } from '../../src/models/people';
/*import './Card.css';*/
import { addCheckedCard, deleteCheckedCard } from '../../src/store/checkedCardSlice';
import checkedCardsSelector from '../../src/store/selectors';

type CardProps = {
  item: ICharacter;
};

function Card({ item }: CardProps) {
  const dispatch = useDispatch();
  const checkedCards: ICharacter[] = useSelector(checkedCardsSelector);

  const handleClick = (url: string) => {
    const id = Number((url.match(/\d+/g) ?? [0, 0])[1]);

    /*navigate(`/${id}?page=${page}`);*/
  };
  return (
    <button type="button" data-testid="openDetailedCardButton" className="card" onClick={() => handleClick(item.url)}>
      <input
        type="checkbox"
        checked={!!checkedCards.find((char) => char.url === item.url)}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => (e.target.checked ? dispatch(addCheckedCard(item)) : dispatch(deleteCheckedCard(item)))}
      />
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
