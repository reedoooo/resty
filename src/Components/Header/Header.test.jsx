import { render, screen } from '@testing-library/react';
import Header from './index.jsx';

describe('Header component', () => {
  test('renders the header', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('displays the correct text', () => {
    render(<Header />);
    const headerText = screen.getByText(/RESTy \(ygoprodeck\)/i);
    expect(headerText).toBeInTheDocument();
  });
});
