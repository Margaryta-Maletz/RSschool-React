import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import DetailedCard from '../components/detailed-card';
import { ICharacter } from '../models/people';

const mockCharacter: ICharacter = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.py4e.com/api/people/1/',
};

const mockFetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCharacter),
  })
);

const mockNavigate = vi.fn();

vi.mock('', async () => {
  const actual = await vi.importActual('');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('DetailedCard', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
  });

  test('renders spinner while fetching data', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<DetailedCard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders loaded DetailedCard', async () => {
    const { getByText, getByRole } = render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<DetailedCard />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    expect(getByText(mockCharacter.name)).toBeInTheDocument();
    expect(getByRole('button', { name: /Close/i })).toBeInTheDocument();
  });

  test('close DetailedCard', async () => {
    const { queryByText, getByText, getByRole } = render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<DetailedCard />} />
          <Route path="/" element={<div>Detailed card closed</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    expect(getByText(mockCharacter.name)).toBeInTheDocument();

    const closeButton = getByRole('button', { name: /Close/i });
    expect(closeButton).toBeInTheDocument();

    await userEvent.setup().click(closeButton);
    expect(queryByText(mockCharacter.name)).not.toBeInTheDocument();
    expect(getByText('Detailed card closed')).toBeInTheDocument();
  });
});
