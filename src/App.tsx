import { Component } from 'react';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Spinner from './components/spinner/Spinner';
import People from './services/SwapService';
import { IPeople } from './models/people';
import './App.css';

type State = { searchInput: string; people: IPeople; isLoading: boolean };
type Props = unknown;

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { searchInput: '', people: {} as IPeople, isLoading: false };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const searchInput = localStorage.getItem('searchInput');
    this.setState({ searchInput: searchInput ?? '', isLoading: true });

    await People.getPeople(searchInput).then((res) => this.setState({ people: res, isLoading: false }));
  }

  async handleClick(search: string) {
    const { searchInput } = this.state;
    const trimSearch = search.trim();

    if (searchInput !== trimSearch) {
      this.setState({ isLoading: true });
      localStorage.setItem('searchInput', trimSearch);

      await People.getPeople(trimSearch).then((res) =>
        this.setState({ searchInput: trimSearch ?? '', people: res, isLoading: false })
      );
    }
  }

  render() {
    const {
      searchInput,
      people: { results, previous, next, count },
      isLoading,
    } = this.state;

    const isError = previous === null && next === null && count === 0;

    return (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Header defaultValue={searchInput} handleClick={this.handleClick} />
        {isLoading && <Spinner />}
        {!isLoading && isError ? <div>API Error</div> : <Main list={results ?? []} />}
      </ErrorBoundary>
    );
  }
}

export default App;
