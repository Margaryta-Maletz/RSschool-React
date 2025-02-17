import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import Card from '../components/card';
import { ICharacter } from '../models/people';
import Wrapper from './Wrapper';

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
      <Wrapper>
        <Routes>
          <Route path="/" element={<Card item={mockCharacter} />} />
        </Routes>
      </Wrapper>
    );

    expect(getByText(mockCharacter.name)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('checkbox')).toBeInTheDocument();
  });

  test('click Card test by mock navigate', async () => {
    const { getByRole } = render(
      <Wrapper>
        <Routes>
          <Route path="/" element={<Card item={{ ...mockCharacter, url: '' }} />} />
        </Routes>
      </Wrapper>
    );

    const button = getByRole('button');
    expect(button).toBeInTheDocument();

    await userEvent.setup().click(button);
    expect(mockNavigate).toHaveBeenCalledOnce();
  });

  test('test Card checkbox by checked it', async () => {
    const { getByRole } = render(
      <Wrapper>
        <Routes>
          <Route path="/" element={<Card item={{ ...mockCharacter, url: '' }} />} />
        </Routes>
      </Wrapper>
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    await userEvent.setup().click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.setup().click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
