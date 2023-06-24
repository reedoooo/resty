import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/ThemeColors.scss';
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

  const responseHandlers = {
    ygoprodeck: (response) => response.data.data || response.data,
    pokeapi: (response) => response.data.pokemon || response.data,
  };

  const handleResponse = (response, type) => {
    const handler = responseHandlers[type];
    return handler ? handler(response) : response;
  };

  const performApiRequest = async (params) => {
    dispatch({ type: 'updateState', payload: { isLoading: true } });

    let axiosRequestParams = {
      method: params.method,
      // Using the exact URL as provided by the user in the form
      url: params.url,
    };

    if (params.method === 'PUT' || params.method === 'POST') {
      axiosRequestParams.data = params.body;
    }

    try {
      const response = await axios(axiosRequestParams);
      const handledResponse = handleResponse(response, params.type);

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
      dispatch({ type: 'updateState', payload: { isLoading: false } });
      console.error(error);
    }
  };

  function transformApiData(apiData) {
    let endpoints = [];

    for (let gameType in apiData) {
      apiData[gameType].endpoints.forEach((endpoint) => {
        endpoints.push({
          name: `${gameType}-${endpoint.name}`,
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
          <DataDisplay
            data={currentRequest}
            isLoading={state.isLoading}
            currentRequest={currentRequest}
          />
        </Container>

        <PreviousRequests
          data={state.pastRequests.slice(1)}
          loadHistory={fetchHistory}
        />
      </Container>

      <Footer creator={'Reed Vogt'} />
    </section>
  );
}

export default MainApp;
