import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserInputForm from './index.jsx';

describe('<UserInputForm />', () => {
  const mockHandleApiCall = jest.fn();

  test('renders form elements and default states', () => {
    render(<UserInputForm handleApiCall={mockHandleApiCall} />);

    // Checks if form and input elements exist
    expect(screen.getByTestId('api-form')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'url' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'GO!' })).toBeInTheDocument();

    // Checks if textarea is disabled by default
    expect(
      screen.getByRole('textbox', { name: 'Request Body' }),
    ).toBeDisabled();
  });

  test('updates url input value when typed into', () => {
    render(<UserInputForm handleApiCall={mockHandleApiCall} />);
    const urlInput = screen.getByRole('textbox', { name: 'url' });
    fireEvent.change(urlInput, { target: { value: 'https://test-api.com' } });
    expect(urlInput.value).toBe('https://test-api.com');
  });

  test('updates request body textarea when valid JSON is typed into', () => {
    render(<UserInputForm handleApiCall={mockHandleApiCall} />);
    const postMethod = screen.getByRole('radio', { name: 'POST' });
    fireEvent.click(postMethod); // Enables textarea
    const bodyInput = screen.getByRole('textbox', { name: 'Request Body' });
    fireEvent.change(bodyInput, { target: { value: '{"key": "value"}' } });
    expect(bodyInput.value).toBe('{"key": "value"}');
  });

  test('calls handleApiCall when form is submitted', () => {
    render(<UserInputForm handleApiCall={mockHandleApiCall} />);
    const urlInput = screen.getByRole('textbox', { name: 'url' });
    const postMethod = screen.getByRole('radio', { name: 'POST' });
    const bodyInput = screen.getByRole('textbox', { name: 'Request Body' });
    const formSubmitButton = screen.getByRole('button', { name: 'GO!' });

    fireEvent.change(urlInput, { target: { value: 'https://test-api.com' } });
    fireEvent.click(postMethod);
    fireEvent.change(bodyInput, { target: { value: '{"key": "value"}' } });
    fireEvent.click(formSubmitButton);

    expect(mockHandleApiCall).toBeCalledTimes(1);
  });
});
