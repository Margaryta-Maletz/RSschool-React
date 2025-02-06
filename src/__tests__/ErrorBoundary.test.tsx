import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../components/error-boundary';

let isError = true;

function ErrorComponent() {
  if (isError) {
    throw new Error('Test error');
  }
  return <div>Everything ok</div>;
}

const spy = vi.spyOn(console, 'error');
spy.mockImplementation(() => null);

describe('ErrorBoundary', () => {
  it('renders when no error', () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div>No error</div>
      </ErrorBoundary>
    );

    expect(screen.queryByText('No error')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByRole('button', { name: /Come back/i })).toBeInTheDocument();
  });

  it('push Back button', async () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const backButton = screen.getByRole('button', { name: /Come back/i });

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(screen.queryByText('Everything ok')).not.toBeInTheDocument();

    isError = false;
    await userEvent.setup().click(backButton);
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    expect(screen.getByText('Everything ok')).toBeInTheDocument();
  });
});
