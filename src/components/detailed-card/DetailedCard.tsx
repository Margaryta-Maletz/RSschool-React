import { useEffect, useState } from 'react';
import { ICharacter } from '../../models/people';
import './DetailedCard.css';
import People from '../../services/SwapService';
import Spinner from '../spinner';

type DetailedCardProps = {
  id: number;
  onClose: () => void;
};

function DetailedCard({ id, onClose }: DetailedCardProps) {
  const [item, setItem] = useState<ICharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await People.getCharacter(id).then((res) => {
        setItem(res);
        setIsLoading(false);
      });
    })();
  }, [id]);

  return !item || isLoading ? (
    <Spinner />
  ) : (
    <div className="card">
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
      <button className="button" type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default DetailedCard;
