import { PureComponent } from 'react';
import { ICharacter } from '../../models/people';
import './Main.css';

type MainProps = {
  list: ICharacter[];
};

class Main extends PureComponent<MainProps> {
  render() {
    const { list } = this.props;

    return (
      <div className="main-container">
        {list.map((item) => (
          <div className="card" key={item.name}>
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
          </div>
        ))}
      </div>
    );
  }
}

export default Main;
