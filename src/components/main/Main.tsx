import { Outlet } from 'react-router';
import { ICharacter } from '../../models/people';
import './Main.css';
import CardList from '../card-list';

type MainProps = {
  list: ICharacter[];
};

function Main({ list }: MainProps) {
  return (
    <div className="main-container">
      <CardList list={list} />
      <Outlet />
    </div>
  );
}

export default Main;
