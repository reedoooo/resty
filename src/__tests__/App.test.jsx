import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
// import MainApp from '../App';
// import App from '../App';

// Mock out axios
jest.mock('axios');

describe('MainApp component', () => {
  beforeEach(() => {
    // Reset the mocked values before each test
    axios.mockReset();
  });

  test('renders without crashing', () => {
    render(<MainApp />);
    const mainAppElement = screen.getByTestId('mainApp');
    expect(mainAppElement).toBeInTheDocument();
  });

  test('performApiRequest calls axios and dispatches storeResults action', async () => {
    // Setup the axios mock
    const axiosResponse = {
      data: {
        data: [{
          name: 'Test data',
        }],
      },
    };
    axios.mockResolvedValueOnce(axiosResponse);

    // Render the component
    const { getByText } = render(<MainApp />);

    // Simulate clicking a button to trigger the API call, for example:
    fireEvent.click(getByText('Trigger API Call'));

    // Assert that axios was called
    expect(axios).toHaveBeenCalledTimes(1);

    // Assert that the storeResults action was dispatched with the expected payload
    // Note: this requires accessing the reducer's state, which might require modifying the component
    // to provide a test hook for the state, or integrating a state management library that provides
    // a way to access the state from outside the component.

    // Wait for changes to take effect in the DOM
    await waitFor(() => screen.getByText('Test data'));

    // Verify that the correct data is displayed
    expect(screen.getByText('Test data')).toBeInTheDocument();
    test('form submission triggers API request with correct data', async () => {
      // Prepare the axios mock
      const axiosResponse = {
        data: {
          data: [{
            name: 'Test data',
          }],
        },
      };
      axios.mockResolvedValueOnce(axiosResponse);
  
      // Render the component
      render(<MainApp />);
      
      // Simulate filling out the form
      fireEvent.change(screen.getByPlaceholderText('https://db.ygoprodeck.com/api/v7/cardinfo.php/'), { target: { value: 'https://testapi.com' } });
      fireEvent.click(screen.getByText('POST'));  // Assuming 'POST' is the text on the radio button
      fireEvent.change(screen.getByPlaceholderText('{\n"key":"value"\n}'), { target: { value: '{"name": "test"}' } });
      
      // Simulate form submission
      fireEvent.click(screen.getByText('GO!')); 
  
      // Wait for the API call to resolve and the component state to update
      await waitFor(() => screen.getByText('Test data'));
  
      // Verify that axios was called with the correct data
      expect(axios).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://testapi.com',
        headers: {
          dummy: "dummyHeader",
        },
        body: { name: 'test' },
        count: '5',
      });
  
      // Check that the response data is displayed
      expect(screen.getByText('Test data')).toBeInTheDocument();
    });
  });
});