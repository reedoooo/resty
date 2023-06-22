import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataDisplay from './index.jsx';

describe('<DataDisplay />', () => {
  test('renders DataFetchingIndicator when isLoading is true', () => {
    render(<DataDisplay isLoading={true} data={null} />);
    expect(screen.getByTestId('data-fetching-indicator')).toBeInTheDocument();
  });

  test('renders Pokemon names when given Pokemon API data', () => {
    const mockPokemonData = {
      request: {
        url: 'https://pokeapi.co/api/v2/pokemon',
      },
      response: {
        results: [
          { name: 'bulbasaur' },
          { name: 'ivysaur' },
          // Add more mock Pokemon data as needed
        ],
      },
    };

    render(<DataDisplay isLoading={false} data={mockPokemonData} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  test('renders Yugioh names when given Yugioh API data', () => {
    const mockYugiohData = {
      request: {
        url: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',
      },
      response: [
        { name: 'Dark Magician' },
        { name: 'Blue-Eyes White Dragon' },
        // Add more mock Yugioh data as needed
      ],
    };

    render(<DataDisplay isLoading={false} data={mockYugiohData} />);
    expect(screen.getByText('Dark Magician')).toBeInTheDocument();
    expect(screen.getByText('Blue-Eyes White Dragon')).toBeInTheDocument();
  });
});
