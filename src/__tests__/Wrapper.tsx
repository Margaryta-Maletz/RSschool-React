import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';

function Wrapper({ initialEntries, children }: PropsWithChildren<{ initialEntries?: string[] }>) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </Provider>
  );
}

Wrapper.defaultProps = {
  initialEntries: ['/'],
};

export default Wrapper;
