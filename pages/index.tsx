`use client`;

import { createContext, useState } from 'react';
import ErrorBoundary from '../components/error-boundary';
import Header from '../components/header';
import Main from '../components/main';
import { GetServerSideProps } from 'next';
import { IPeople } from '../src/models/people';
/*import useLocalStorage from '../src/hooks/useLocalStorage';*/
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

const THEME = {
  light: 'light',
  dark: 'dark',
};

function App({ count = 0, results }: IPeople) {
  const ThemeContext = createContext(THEME.light);
  const [theme, setTheme] = useState(THEME.light);
  const { push } = useRouter();

  const searchParams = useSearchParams();
  /*    const [savedInput, setNewValue] = useLocalStorage(KEY);*/
  const savedInput = searchParams.get('search') ?? '';

  const handleClick = (search: string) => {
    /*        if (id) {
            push(`/?page=${page}`);
        }*/

    push(`?page=1&search=${search.trim()}`);
    /*        if (savedInput !== trimSearch) {
            setNewValue(trimSearch);
/!*            setSearchParams((prev) => ({ ...prev, page: '1' }));*!/
        }*/
  };

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
          {/*                    {isLoading && <Spinner />}
                    {!isLoading && isError ? (
                        <div>API Error</div>
                    ) : (
                        <Main list={people?.results ?? []} all={Math.ceil(people?.count ?? 0 / 10)} />
                    )}*/}
          <Main list={results ?? []} all={Math.ceil(count ?? 1 / 10)} />
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export const getServerSideProps: GetServerSideProps<IPeople, { search: string; page: string }> = async ({ query }) => {
  const { search, page } = query || { search: '', page: '1' };

  const url = new URL('https://swapi.py4e.com/api/people');
  const requestParams = {
    search: (search ?? '') as string,
    page: (page ?? '') as string,
  };
  url.search = new URLSearchParams(requestParams).toString();

  const res = await fetch(url.toString());
  const { count, next, previous, results } = await res.json();

  return {
    props: {
      count,
      next,
      previous,
      results,
    },
  };
};

export default App;
