import { useReducer } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AppStyles.scss';
import AppHeader from './Components/Header';
import { Container } from 'react-bootstrap';
import UserInputForm from './Components/Form';
import DataDisplay from './Components/Results';
import PreviousRequests from './Components/History';
import Footer from './Components/Footer';

let startState = {
  isLoading: false,
  output: null,
  pastRequests: [],
};

const actions = {
  fetching: (state, action) => ({ ...state, ...action.payload }),
  storeResults: (state, action) => ({ ...state, ...action.payload }),
  fetchHistory: (state, action) => ({ ...state, ...action.payload }),
};

const appReducer = (state, action) => {
  const handler = actions[action.type];
  return handler ? handler(state, action) : state;
};

function MainApp() {
  const [state, dispatch] = useReducer(appReducer, startState);

  const handleResponse = (response, isPokemonAPI, isYugiohAPI) => {
    if (isYugiohAPI) {
      return response.data.data || response.data;
    }

    if (isPokemonAPI) {
      // handle PokemonAPI response here
      return response.data.pokemon || response.data;
    }

    // default response handling
    return response;
  };

  const performApiRequest = async (params) => {
    dispatch({
      type: 'fetching',
      payload: {
        isLoading: true,
        output: state.output,
        pastRequests: state.pastRequests,
      },
    });

    const isPokemonAPI = params.url.includes('pokeapi.co');
    const isYugiohAPI = params.url.includes('ygoprodeck.com');

    let axiosRequestParams = {
      method: params.method,
      url: params.url,
    };

    if (params.method === 'PUT' || params.method === 'POST') {
      axiosRequestParams.data = params.body;
    }

    try {
      const response = await axios(axiosRequestParams);
      const handledResponse = handleResponse(
        response,
        isPokemonAPI,
        isYugiohAPI,
      );

      dispatch({
        type: 'storeResults',
        payload: {
          isLoading: false,
          output: {
            request: {
              method: params.method,
              url: params.url,
            },
            response: handledResponse,
          },
          pastRequests: [
            {
              request: {
                method: params.method,
                url: params.url,
                headers: params.headers,
                body: params.body,
              },
              response: handledResponse,
            },
            ...state.pastRequests,
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const triggerApiCall = (params) => {
    // if the method is 'get' or 'delete' AND there is a url attached to the request
    if ((params.method === 'GET' || params.method === 'DELETE') && params.url) {
      performApiRequest(params);
    }
    // if the method is 'post' or 'put' then the request also needs a url AND body
    else if (
      (params.method === 'POST' || params.method === 'PUT') &&
      params.url &&
      params.body
    ) {
      performApiRequest(params);
    }
    // otherwise, console.error
    else {
      console.error(
        'Improper request made. Request needs method and url. If method is PUT or POST, request also needs a body.',
      );
    }
  };

  const fetchHistory = (idx) => {
    dispatch({
      type: 'fetchHistory',
      payload: {
        isLoading: false,
        output: state.pastRequests[idx],
        pastRequests: state.pastRequests,
      },
    });
  };

  return (
    <section
      data-testid={'mainApp'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <AppHeader />

      <Container style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Container style={{ width: '50%' }}>
          <UserInputForm handleApiCall={triggerApiCall} />
        </Container>

        <Container style={{ width: '50%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>
              URL:
              {state.output && state.output.request && state.output.request.url}
            </p>
            <p>
              Request Method:{' '}
              {state.output &&
                state.output.request &&
                state.output.request.method}
            </p>
          </div>
          <DataDisplay data={state.output} isLoading={state.isLoading} />
        </Container>
      </Container>

      <PreviousRequests data={state.pastRequests} loadHistory={fetchHistory} />

      <Footer creator={'Reed Vogt'} />
    </section>
  );
}

export default MainApp;
