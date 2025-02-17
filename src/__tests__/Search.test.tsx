import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Search from '../components/search';
import Wrapper from './Wrapper';

const handleClick = vi.fn();
const mockDefaultValue = 'test';

describe('Search', () => {
  beforeEach(() => {
    handleClick.mockClear();
  });

  test('renders Search', async () => {
    render(
      <Wrapper>
        <Routes>
          <Route path="/" element={<Search defaultValue={mockDefaultValue} handleClick={handleClick} />} />
        </Routes>
      </Wrapper>
    );

    const input = screen.getByTestId('input');
    const button = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(mockDefaultValue);
    expect(button).toBeInTheDocument();
  });

  test('push and type input in Search', async () => {
    render(
      <Wrapper>
        <Routes>
          <Route path="/" element={<Search defaultValue={mockDefaultValue} handleClick={handleClick} />} />
        </Routes>
      </Wrapper>
    );

    const input = screen.getByTestId('input');
    const button = screen.getByRole('button');

    await userEvent.setup().type(input, '{Enter}');
    expect(handleClick).toHaveBeenCalledOnce();
    await userEvent.setup().click(button);
    expect(handleClick).toHaveBeenCalledTimes(2);
    expect(handleClick).toHaveBeenCalledWith(mockDefaultValue);
  });
});
