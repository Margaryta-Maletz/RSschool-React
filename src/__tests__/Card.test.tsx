import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import Card from '../components/card';
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

const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Card', async () => {
    const { getByText, getByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Card item={mockCharacter} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText(mockCharacter.name)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('click Card test by mock navigate', async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Card item={{ ...mockCharacter, url: '' }} />} />
        </Routes>
      </MemoryRouter>
    );

    const button = getByRole('button');
    expect(button).toBeInTheDocument();

    await userEvent.setup().click(button);
    expect(mockNavigate).toHaveBeenCalledOnce();
  });
});
