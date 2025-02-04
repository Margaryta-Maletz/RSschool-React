import { Outlet } from 'react-router';
import { ICharacter } from '../../models/people';
import './Main.css';
import CardList from '../card-list';
import Pagination from '../pagination';

type MainProps = {
  list: ICharacter[];
  all: number;
};

function Main({ list, all }: MainProps) {
  return (
    <>
      <div className="main-container">
        <CardList list={list} />
        <Outlet />
      </div>
      <Pagination all={all} />
    </>
  );
}

export default Main;
