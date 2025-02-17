import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../components/pagination';
import Wrapper from './Wrapper';

const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('Pagination', () => {
  it('renders Pagination with disabled buttons', () => {
    render(
      <Wrapper>
        <Pagination all={1} />
      </Wrapper>
    );
    const buttonPrevious = screen.getByRole('button', { name: /Previous/i }) as HTMLButtonElement;
    const buttonNext = screen.getByRole('button', { name: /Next/i }) as HTMLButtonElement;
    expect(buttonPrevious).toBeInTheDocument();
    expect(buttonPrevious.disabled).toBeTruthy();
    expect(screen.getByText('1 / 1')).toBeInTheDocument();
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext.disabled).toBeTruthy();
  });

  it('renders Pagination 5 pages with enabled buttons', () => {
    render(
      <Wrapper initialEntries={['/?page=3']}>
        <Pagination all={5} />
      </Wrapper>
    );
    const buttonPrevious = screen.getByRole('button', { name: /Previous/i }) as HTMLButtonElement;
    const buttonNext = screen.getByRole('button', { name: /Next/i }) as HTMLButtonElement;
    expect(buttonPrevious).toBeInTheDocument();
    expect(buttonPrevious.disabled).toBeFalsy();
    expect(screen.getByText('3 / 5')).toBeInTheDocument();
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext.disabled).toBeFalsy();
  });
});
