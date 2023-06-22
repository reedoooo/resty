import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppHeader from './index.jsx';

describe('<AppHeader />', () => {
  test('renders header and h1', () => {
    render(<AppHeader />);

    // Checks if header and h1 exist
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('RESTy (ygoprodeck)')).toBeInTheDocument();
  });
});
