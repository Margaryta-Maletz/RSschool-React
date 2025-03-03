import { ICharacter } from '../../src/models/people';
/*import './Main.css';*/
import CardList from '../card-list';
import Pagination from '../pagination';
import Flyout from '../flyout';

type MainProps = {
  list: ICharacter[];
  all: number;
};

function Main({ list, all }: MainProps) {
  return (
    <>
      <div className="main-container">
        <CardList list={list} />
{/*        <Outlet />*/}
        <Flyout />
      </div>
      <Pagination all={Math.ceil(all / 10)} />
    </>
  );
}

export default Main;
