import { PureComponent } from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Spinner from './components/spinner/Spinner';
import People from './services/SwapService';
import { IPeople } from './models/people';
import './App.css';

type State = { searchInput: string; people: IPeople; isLoading: boolean };
type Props = unknown;

class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { searchInput: '', people: {} as IPeople, isLoading: false };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.setState((prev) => ({ ...prev, isLoading: true }));
    const searchInput = localStorage.getItem('searchInput');

    await People.getPeople(searchInput).then((res) =>
      this.setState({ searchInput: searchInput ?? '', people: res, isLoading: false })
    );
  }

  async handleClick(search: string) {
    const { searchInput } = this.state;
    const trimSearch = search.trim();

    if (searchInput !== trimSearch) {
      this.setState((prev) => ({ ...prev, isLoading: true }));
      localStorage.setItem('searchInput', trimSearch);

      await People.getPeople(trimSearch).then((res) =>
        this.setState({ searchInput: trimSearch ?? '', people: res, isLoading: false })
      );
    }
  }

  render() {
    const {
      searchInput,
      people: { results },
      isLoading,
    } = this.state;

    return (
      <>
        <Header defaultValue={searchInput} handleClick={this.handleClick} />
        {isLoading ? <Spinner /> : <Main list={results ?? []} />}
      </>
    );
  }
}

export default App;
