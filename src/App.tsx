import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary';
import Header from './components/header';
import Main from './components/main';
import Spinner from './components/spinner';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import { useGetPeopleQuery } from './services/SwapService';
import { IPeople } from './models/people';

const KEY = 'searchInput';

function App() {
  const [savedInput, setNewValue] = useLocalStorage(KEY);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const navigate = useNavigate();
  const { data: people, isLoading } = useGetPeopleQuery({ search: savedInput, page });

  const handleClick = (search: string) => {
    if (id) {
      navigate(`/?page=${page}`);
    }

    const trimSearch = search.trim();

    if (savedInput !== trimSearch) {
      setNewValue(trimSearch);
      setSearchParams((prev) => ({ ...prev, page: '1' }));
    }
  };

  const { results, previous, next, count } = people as IPeople;
  const isError = previous === null && next === null && count === 0;

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Header defaultValue={savedInput || ''} handleClick={handleClick} />
      {isLoading && <Spinner />}
      {!isLoading && isError ? <div>API Error</div> : <Main list={results ?? []} all={Math.ceil(count / 10)} />}
    </ErrorBoundary>
  );
}

export default App;
