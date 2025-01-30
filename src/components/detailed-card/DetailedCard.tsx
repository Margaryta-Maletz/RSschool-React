import { useParams, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import './DetailedCard.css';
import Spinner from '../spinner';
import { useGetCharacterQuery } from '../../services/SwapService';

function DetailedCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const { data: item, isLoading } = useGetCharacterQuery(id);

  const handleClose = () => {
    navigate(`/?page=${page}`);
  };

  return !item || isLoading ? (
    <Spinner />
  ) : (
    <div className="detailed-card">
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
