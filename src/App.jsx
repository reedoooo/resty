import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AppStyles.scss';
import AppHeader from './Components/Header';
import { Container } from 'react-bootstrap';
import endpointData from './Data/endpoint-list.json'; // Import JSON data

import UserInputForm from './Components/Form';
import DataDisplay from './Components/Results';
import PreviousRequests from './Components/History';
import Footer from './Components/Footer';

let startState = {
  isLoading: false,
  pastRequests: [],
};

// const actions = {
//   updateState: (state, action) => ({ ...state, ...action.payload }),
// };

// const appReducer = (state, action) => {
//   const handler = actions[action.type];
//   return handler ? handler(state, action) : state;
// };
// const appReducer = (state, action) => {
//   switch (action.type) {
//     case 'updateState':
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };
const appReducer = (state, action) => {
  if (action.type === 'updateState') {
    return { ...state, ...action.payload };
  }

  return state; // No need for the default case in switch, it's now the fallback return
};

function MainApp() {
  const [state, dispatch] = useReducer(appReducer, startState);
  const [apiEndpointsData, setApiEndpointsData] = useState([]);

  useEffect(() => {
    async function fetchApiEndpointsData() {
      const apiEndpoints = await Promise.resolve(endpointData.api[0]); // Access the first (and only) element of the array
      setApiEndpointsData(transformApiData(apiEndpoints)); // use the transformApiData function here
    }
    fetchApiEndpointsData();
  }, []);

  const handleResponse = (response, url) => {
    if (url.includes('ygoprodeck.com')) {
      return response.data.data || response.data;
    }

    if (url.includes('pokeapi.co')) {
      // handle PokemonAPI response here
      return response.data.pokemon || response.data;
    }

    // default response handling
    return response;
  };

  const performApiRequest = async (params) => {
    dispatch({ type: 'updateState', payload: { isLoading: true } });

    let axiosRequestParams = {
      method: params.method,
      url: params.url,
    };

    if (params.method === 'PUT' || params.method === 'POST') {
      axiosRequestParams.data = params.body;
    }

    try {
      const response = await axios(axiosRequestParams);
      const handledResponse = handleResponse(response, params.url);

      const newRequest = {
        request: {
          method: params.method,
          url: params.url,
          headers: params.headers,
          body: params.body,
        },
        response: handledResponse,
      };

      dispatch({
        type: 'updateState',
        payload: {
          isLoading: false,
          pastRequests: [newRequest, ...state.pastRequests],
        },
      });
    } catch (error) {
      dispatch({ type: 'updateState', payload: { isLoading: false } }); // Adding this line
      console.error(error);
    }
  };

  function transformApiData(apiData) {
    let endpoints = [];

    for (let game in apiData) {
      // Iterate over 'yugioh' and 'pokemon'
      apiData[game].endpoints.forEach((endpoint) => {
        endpoints.push({
          name: `${game}-${endpoint.name}`,
          url: endpoint.url,
        });
      });
    }

    return endpoints;
  }

  const triggerApiCall = (params) => {
    const { method, url, body } = params;

    if (!url) {
      console.error('Request needs a URL.');
      return;
    }

    if (
      method === 'GET' ||
      method === 'DELETE' ||
      ((method === 'POST' || method === 'PUT') && body)
    ) {
      performApiRequest(params);
    } else {
      console.error('Request needs a body for PUT or POST methods.');
    }
  };

  const fetchHistory = (idx) => {
    dispatch({
      type: 'updateState',
      payload: {
        isLoading: false,
        pastRequests: [state.pastRequests[idx], ...state.pastRequests.slice(1)],
      },
    });
  };

  const currentRequest = state.pastRequests[0];

  if (apiEndpointsData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="main-app">
      <AppHeader />

      <Container className="main-container">
        <Container className="user-input-container">
          <UserInputForm
            handleApiCall={triggerApiCall}
            apiEndpointsData={apiEndpointsData}
          />
        </Container>

        <Container className="data-display-container">
          <div className="request-info">
            <p>
              URL:{' '}
              {currentRequest &&
                currentRequest.request &&
                currentRequest.request.url}
            </p>
            <p>
              Request Method:{' '}
              {currentRequest &&
                currentRequest.request &&
                currentRequest.request.method}
            </p>
          </div>
          <DataDisplay data={currentRequest} isLoading={state.isLoading} />
        </Container>
      </Container>

      <PreviousRequests
        data={state.pastRequests.slice(1)}
        loadHistory={fetchHistory}
      />

      <Footer creator={'Reed Vogt'} />
    </section>
  );
}

export default MainApp;
