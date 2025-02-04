import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/error-boundary/index';

describe('App', () => {
  test('renders App', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <App />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText('1 / 0')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });
});
