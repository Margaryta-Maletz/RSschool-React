import './DetailedCard.css';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner';
import { addCheckedCard, deleteCheckedCard } from '../../src/store/checkedCardSlice';
import { ICharacter } from '../../src/models/people';
import checkedCardsSelector from '../../src/store/selectors';

function DetailedCard() {
  const dispatch = useDispatch();
  const checkedCards: ICharacter[] = useSelector(checkedCardsSelector);
  const item =  {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.py4e.com/api/people/1/',
  };

  const handleClose = () => {
    /*navigate(`/?page=${page}`);*/
  };

/*  return !item || isLoading ? (
    <Spinner />
  ) : */
    return (
    <div className="detailed-card">
      <input
        type="checkbox"
        checked={!!checkedCards.find((char) => char.url === item.url)}
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
      <button
        className="button"
        type="button"
        onClick={handleClose}
        style={{ backgroundColor: 'green', padding: '0 20px' }}
      >
        Close
      </button>
    </div>
  );
}

export default DetailedCard;
