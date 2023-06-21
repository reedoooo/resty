import { render, fireEvent, screen } from '@testing-library/react';
import UserInputForm from './index.jsx';

const mockHandleApiCall = jest.fn();

describe('UserInputForm component', () => {
  test('renders the form', () => {
    render(<UserInputForm handleApiCall={mockHandleApiCall} />);
    const formElement = screen.getByTestId('api-form');
    expect(formElement).toBeInTheDocument();
  });

  test('button triggers handleApiCall when form is submitted', () => {
    render(<UserInputForm handleApiCall={mockHandleApiCall} />);
    
    const submitButton = screen.getByTestId('form-submit-button');
    fireEvent.click(submitButton);
    
    expect(mockHandleApiCall).toHaveBeenCalledTimes(1);
  });

  // Add more tests as needed, for example to check form input changes
});
