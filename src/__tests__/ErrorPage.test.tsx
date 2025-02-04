import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ErrorPage from '../components/error-page';

describe('ErrorPage 404', () => {
  it('renders error message', () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Oops/i)).toBeInTheDocument();

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('renders Home Button', () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole('link', {
        name: /Home/i,
      })
    ).toBeInTheDocument();
  });

  it('renders Back Button', () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole('link', {
        name: /Previous page/i,
      })
    ).toBeInTheDocument();
  });
});
