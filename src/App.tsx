import './App.css';
import { PureComponent } from 'react';
import Main from './components/main/Main';
import Header from './components/header/Header';
import People from './services/SwapService';
import { IPeople } from './models/people';

type State = { searchInput: string; people: IPeople };
type Props = unknown;

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { searchInput: '', people: {} as IPeople };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const searchInput = localStorage.getItem('searchInput');

    await People.getPeople(searchInput).then((res) => this.setState({ searchInput: searchInput ?? '', people: res }));
  }

  async handleClick(search: string) {
    const { searchInput } = this.state;
    const trimSearch = search.trim();

    if (searchInput !== trimSearch) {
      this.setState(() => ({ searchInput: trimSearch }));
      localStorage.setItem('searchInput', trimSearch);

      await People.getPeople(trimSearch).then((res) => this.setState({ searchInput: trimSearch ?? '', people: res }));
    }
  }

  render() {
    const {
      searchInput,
      people: { results },
    } = this.state;

    return (
      <>
        <Header defaultValue={searchInput} handleClick={this.handleClick} />
        <Main list={results ?? []} />
      </>
    );
  }
}

export default App;
