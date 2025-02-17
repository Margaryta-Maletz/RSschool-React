import { beforeAll, afterEach, afterAll, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { delay, http, HttpResponse } from 'msw';
import DetailedCard from '../components/detailed-card';
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

const handlers = [
  /*    http.get("https://swapi.dev/api/people/", async () => {
        await delay(200);
        return HttpResponse.json(peopleAnswer);
    }), */
  http.get('https://swapi.py4e.com/api/people/1', async () => {
    await delay(100);
    return HttpResponse.json(mockCharacter);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const mockNavigate = vi.fn();

vi.mock('', async () => {
  const actual = await vi.importActual('');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('DetailedCard', () => {
  test('renders spinner while fetching data', () => {
    render(
      <Wrapper initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<DetailedCard />} />
        </Routes>
      </Wrapper>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders loaded DetailedCard', async () => {
    const { findByText, findByRole } = render(
      <Wrapper initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<DetailedCard />} />
        </Routes>
      </Wrapper>
    );

    expect(await findByText(mockCharacter.name)).toBeInTheDocument();
    expect(await findByRole('button', { name: /Close/i })).toBeInTheDocument();
  });

  test('close DetailedCard', async () => {
    const { queryByText, getByText, getByRole } = render(
      <Wrapper initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<DetailedCard />} />
          <Route path="/" element={<div>Detailed card closed</div>} />
        </Routes>
      </Wrapper>
    );

    await waitFor(() => expect(getByText(mockCharacter.name)).toBeInTheDocument());

    const closeButton = getByRole('button', { name: /Close/i });
    expect(closeButton).toBeInTheDocument();

    await userEvent.setup().click(closeButton);
    expect(queryByText(mockCharacter.name)).not.toBeInTheDocument();
    expect(getByText('Detailed card closed')).toBeInTheDocument();
  });
});
