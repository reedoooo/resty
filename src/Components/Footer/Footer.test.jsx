import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './index.jsx';
import '@testing-library/jest-dom/extend-expect';

describe('<Footer />', () => {
  test('renders Footer component with author prop', () => {
    const authorName = 'Author Name';
    render(<Footer author={authorName} />);
    expect(screen.getByTestId('footer')).toHaveTextContent(
      `Author: ${authorName}`,
    );
  });

  test('renders Footer component with copyright notice', () => {
    render(<Footer author="Author Name" />);
    expect(screen.getByTestId('footer')).toHaveTextContent('© 2023');
  });
});
