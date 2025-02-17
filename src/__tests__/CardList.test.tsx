import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import CardList from '../components/card-list';
import { ICharacter } from '../models/people';
import Wrapper from './Wrapper';

const mockList: ICharacter[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.py4e.com/api/people/1/',
  },
];

describe('CardList', () => {
  test('renders CardList', async () => {
    const { getByText, getAllByRole } = render(
      <Wrapper>
        <Routes>
          <Route path="/" element={<CardList list={mockList} />} />
        </Routes>
      </Wrapper>
    );
    expect(getByText(mockList[0].name)).toBeInTheDocument();
    expect(getAllByRole('button')).toHaveLength(2);
  });

  test('close DetailedCard', async () => {
    const { queryByText, getByText, getByTestId } = render(
      <Wrapper initialEntries={['/1']}>
        <Routes>
          <Route
            path="/:id"
            element={
              <>
                <CardList list={mockList} />
                <div>Detailed card open</div>
              </>
            }
          />
          <Route path="/" element={<CardList list={mockList} />} />
        </Routes>
      </Wrapper>
    );

    const openDetailedCardButton = getByTestId('openDetailedCardButton');
    expect(openDetailedCardButton).toBeInTheDocument();

    const section = getByTestId('section');
    expect(section).toBeInTheDocument();

    expect(getByText('Detailed card open')).toBeInTheDocument();
    await userEvent.setup().click(section);
    expect(queryByText('Detailed card open')).not.toBeInTheDocument();

    await userEvent.setup().click(openDetailedCardButton);
    expect(getByText('Detailed card open')).toBeInTheDocument();
    await userEvent.setup().type(section, '{Enter}');
    expect(queryByText('Detailed card open')).not.toBeInTheDocument();

    await userEvent.setup().click(openDetailedCardButton);
    expect(getByText('Detailed card open')).toBeInTheDocument();
    await userEvent.setup().type(section, '{NumpadEnter}');
    expect(queryByText('Detailed card open')).not.toBeInTheDocument();
  });
});
