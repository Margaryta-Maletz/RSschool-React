import { useDispatch, useSelector } from 'react-redux';
import { ICharacter } from '../../src/models/people';
/*import './Card.css';*/
import { addCheckedCard, deleteCheckedCard } from '../../src/store/checkedCardSlice';
import checkedCardsSelector from '../../src/store/selectors';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

type CardProps = {
  item: ICharacter;
};

function Card({ item }: CardProps) {
  const dispatch = useDispatch();
  const checkedCards: ICharacter[] = useSelector(checkedCardsSelector);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const search = searchParams.get('search') ?? '';

  const handleClick = (url: string) => {
    const id = Number((url.match(/\d+/g) ?? [0, 0])[1]);

    push(`/${id}?page=${page}&search=${search}`);
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
