import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ICharacter } from '../../models/people';
import './DetailedCard.css';
import People from '../../services/SwapService';
import Spinner from '../spinner';

function DetailedCard() {
  const [item, setItem] = useState<ICharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      (async () => {
        await People.getCharacter(Number(id)).then((res) => {
          setItem(res);
          setIsLoading(false);
        });
      })();
    }
  }, [id]);

  const handleClose = () => {
    navigate('/');
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
