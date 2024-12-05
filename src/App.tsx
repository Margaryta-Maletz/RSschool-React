import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import ErrorBoundary from './components/error-boundary';
import Header from './components/header';
import Main from './components/main';
import Spinner from './components/spinner';
import People from './services/SwapService';
import { initialPeople, IPeople } from './models/people';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';

const KEY = 'searchInput';

function App() {
  const [savedInput, setNewValue] = useLocalStorage(KEY);
  const [people, setPeople] = useState<IPeople>(initialPeople);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await People.getPeople(savedInput || '').then((res) => {
        setPeople(res);
        setIsLoading(false);
      });
    })();
  }, [savedInput]);

  const handleClick = (search: string) => {
    if (id) {
      navigate('/');
    }

    const trimSearch = search.trim();

    if (savedInput !== trimSearch) {
      setNewValue(trimSearch);
    }
  };

  const { results, previous, next, count } = people;
  const isError = previous === null && next === null && count === 0;

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Header defaultValue={savedInput || ''} handleClick={handleClick} />
      {isLoading && <Spinner />}
      {!isLoading && isError ? <div>API Error</div> : <Main list={results ?? []} />}
    </ErrorBoundary>
  );
}

export default App;
