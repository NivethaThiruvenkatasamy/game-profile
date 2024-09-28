import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders Default', () => {
  render(<App />);
  const defaultElements = screen.getAllByText(/Default/i);
  expect(defaultElements).toHaveLength(2);
});
