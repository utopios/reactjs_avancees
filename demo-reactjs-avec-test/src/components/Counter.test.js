import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';
import React from 'react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../helpers/redux-test-utils';
describe('Counter Component', () => {
  test('renders with initial value', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByTestId('counter')).toHaveTextContent('5');
  });

  test('increments counter when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const counter = screen.getByTestId('counter');
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    
    expect(counter).toHaveTextContent('0');
    
    await user.click(incrementButton);
    expect(counter).toHaveTextContent('1');
    
    await user.click(incrementButton);
    expect(counter).toHaveTextContent('2');
  });

  test('decrements counter when decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={3} />);
    
    const counter = screen.getByTestId('counter');
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    
    await user.click(decrementButton);
    expect(counter).toHaveTextContent('2');
  });

  test('resets counter to zero when reset button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Counter initialValue={10} />, {});
    
    const counter = screen.getByTestId('counter');
    const resetButton = screen.getByRole('button', { name: /reset/i });
    
    await user.click(resetButton);
    expect(counter).toHaveTextContent('0');
  });
});