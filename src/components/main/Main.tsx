import { useState } from 'react';
import { ICharacter } from '../../models/people';
import './Main.css';
import CardList from '../card-list';
import DetailedCard from '../detailed-card';

type MainProps = {
  list: ICharacter[];
};

function Main({ list }: MainProps) {
  const [id, setId] = useState<number | null>(null);
  return (
    <div className="container">
      <CardList list={list} setId={setId} />
      {id && <DetailedCard id={id} onClose={() => setId(null)} />}
    </div>
  );
}

export default Main;
