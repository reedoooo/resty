import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainApp from './App.jsx';
import axios from 'axios';

jest.mock('axios');

describe('<MainApp />', () => {
  test('renders MainApp component', async () => {
    render(<MainApp />);
    expect(screen.getByTestId('mainApp')).toBeInTheDocument();
  });

  // Test that the API is called when user triggers a valid action
  test('calls the Pokemon API on valid user action', async () => {
    axios.mockResolvedValue({ data: {} });

    render(<MainApp />);

    const urlInput = screen.getByPlaceholderText(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php/',
    );
    const methodInput = screen.getByRole('radio', { name: /GET/i });
    const submitButton = screen.getByRole('button', { name: /GO!/i });

    userEvent.type(urlInput, 'https://pokeapi.co/api/v2/pokemon/1');
    userEvent.click(methodInput);
    userEvent.click(submitButton);

    await waitFor(() => expect(axios).toHaveBeenCalledTimes(1));
  });

  test('does not call the Pokemon API on invalid user action', async () => {
    render(<MainApp />);

    const urlInput = screen.getByPlaceholderText(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php/',
    );
    const methodInput = screen.getByRole('radio', { name: /POST/i });
    const submitButton = screen.getByRole('button', { name: /GO!/i });

    userEvent.type(urlInput, 'https://pokeapi.co/api/v2/pokemon/1');
    userEvent.click(methodInput);
    userEvent.click(submitButton);

    await waitFor(() => expect(axios).toHaveBeenCalledTimes(0));
  });

  test('calls the Yugioh API on valid user action', async () => {
    axios.mockResolvedValue({ data: {} });

    render(<MainApp />);

    const urlInput = screen.getByPlaceholderText(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php/',
    );
    const methodInput = screen.getByRole('radio', { name: /GET/i });
    const submitButton = screen.getByRole('button', { name: /GO!/i });

    userEvent.type(urlInput, 'https://db.ygoprodeck.com/api/v7/cardinfo.php');
    userEvent.click(methodInput);
    userEvent.click(submitButton);

    await waitFor(() => expect(axios).toHaveBeenCalledTimes(1));
  });

  test('does not call the Yugioh API on invalid user action', async () => {
    render(<MainApp />);

    const urlInput = screen.getByPlaceholderText(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php/',
    );
    const methodInput = screen.getByRole('radio', { name: /POST/i });
    const submitButton = screen.getByRole('button', { name: /GO!/i });

    userEvent.type(urlInput, 'https://db.ygoprodeck.com/api/v7/cardinfo.php');
    userEvent.click(methodInput);
    userEvent.click(submitButton);

    await waitFor(() => expect(axios).toHaveBeenCalledTimes(0));
  });
});
