import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { createContext, useState } from 'react';
import ErrorBoundary from './components/error-boundary';
import Header from './components/header';
import Main from './components/main';
import Spinner from './components/spinner';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import { useGetPeopleQuery } from './services/SwapService';

const KEY = 'searchInput';
const THEME = {
  light: 'light',
  dark: 'dark',
};

function App() {
  const ThemeContext = createContext(THEME.light);
  const [theme, setTheme] = useState(THEME.light);

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

  const isError = people?.previous === null && people?.next === null && people?.count === 0;

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <ThemeContext.Provider value={theme}>
        <div id="theme" className="theme" data-theme={theme}>
          <div className="radio">
            <div>
              <input
                type="radio"
                value={THEME.light}
                checked={theme === THEME.light}
                onChange={() => setTheme(THEME.light)}
                style={{ backgroundColor: 'transparent' }}
              />
              {THEME.light}
            </div>
            <div>
              <input
                type="radio"
                value={THEME.dark}
                checked={theme === THEME.dark}
                onChange={() => setTheme(THEME.dark)}
                style={{ backgroundColor: 'transparent' }}
              />
              {THEME.dark}
            </div>
          </div>
          <Header defaultValue={savedInput || ''} handleClick={handleClick} />
          {isLoading && <Spinner />}
          {!isLoading && isError ? (
            <div>API Error</div>
          ) : (
            <Main list={people?.results ?? []} all={Math.ceil(people?.count ?? 0 / 10)} />
          )}
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
