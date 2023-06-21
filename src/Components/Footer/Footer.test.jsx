import { render, screen } from '@testing-library/react';
import Footer from './index.jsx';

describe('Footer component', () => {
  test('renders the footer with the author name', () => {
    const testAuthor = 'Test Author';
    render(<Footer author={testAuthor} />);
    
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveTextContent(testAuthor);
  });

  test('renders default text when no author prop is provided', () => {
    render(<Footer />);
    
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveTextContent('Author: ');
  });
});
