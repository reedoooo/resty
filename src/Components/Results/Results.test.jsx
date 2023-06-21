import { render, screen } from '@testing-library/react';
import DataDisplay from './index.jsx';

describe('DataDisplay component', () => {
  test('displays loading indicator when isLoading is true', () => {
    render(<DataDisplay isLoading={true} />);
    const loadingIndicator = screen.getByText(/loading/i);
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('displays data when provided and isLoading is false', () => {
    const data = {
      response: {
        data: [
          { name: 'Test data 1' },
          { name: 'Test data 2' },
        ],
      },
    };
    render(<DataDisplay isLoading={false} data={data} />);
    const dataElement1 = screen.getByText('Test data 1');
    const dataElement2 = screen.getByText('Test data 2');
    expect(dataElement1).toBeInTheDocument();
    expect(dataElement2).toBeInTheDocument();
  });

  test('does not display data when no data is provided', () => {
    render(<DataDisplay isLoading={false} data={null} />);
    expect(screen.queryByTestId('data-display')).toBeEmptyDOMElement();
  });
});
