import { PureComponent } from 'react';
import { ICharacter } from '../../models/people';

type MainProps = {
  list: ICharacter[];
};

class Main extends PureComponent<MainProps> {
  render() {
    const { list } = this.props;

    return (
      <>
        {list.map((item) => (
          <div key={item.name}>
            <div>{item.name}</div>
            <div>{item.gender}</div>
          </div>
        ))}
      </>
    );
  }
}

export default Main;
