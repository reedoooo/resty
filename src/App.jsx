import { useReducer } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AppStyles.scss';
import AppHeader from './Components/Header';
import Footer from './Components/Footer';
import UserInputForm from './Components/Form';
import DataDisplay from './Components/Results';
import PreviousRequests from './Components/History';

function MainApp () {

  let startState = {
    isLoading: false,
    output: null,
    pastRequests: [],
  }

  const appReducer = (state, action) => {
    switch(action.type) {
      case 'fetching':
        return action.payload;
      case 'storeResults':
        return action.payload;
      case 'fetchHistory':
        return action.payload;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(appReducer, startState)

  const performApiRequest = (params) => {

    dispatch({
        type: 'fetching',
        payload: {
            isLoading: true,
            output: state.output,
            pastRequests: state.pastRequests
        }
    });
  
    // Detect which API we are calling
    const isPokemonAPI = params.url.includes('pokeapi.co');
    const isYugiohAPI = params.url.includes('ygoprodeck.com');
  
    let axiosRequestParams = {
        method: params.method,
        url: params.url,
        data: params.body
    };
  
    if (isPokemonAPI) {
        // Make request for Pokemon API
        axios(axiosRequestParams)
        .then(response => {
            dispatch({
                type: 'storeResults',
                payload: {
                    isLoading: false,
                    output: {
                        request: {
                            method: params.method,
                            url: params.url,
                        },
                        response: response, // Handle entire response
                    },
                    pastRequests: [
                        {
                            request: {
                                method: params.method,
                                url: params.url,
                                headers: params.headers,
                                body: params.body,                
                            },
                            response: response, // Handle entire response
                        }, 
                        ...state.pastRequests
                    ]
                }
            });
        })
        .catch(error => {
            console.error(error)
        });
    } else if (isYugiohAPI) {
        // Make request for Yugioh API
        axios(axiosRequestParams)
        .then(response => {
            dispatch({
                type: 'storeResults',
                payload: {
                    isLoading: false,
                    output: {
                        request: {
                            method: params.method,
                            url: params.url,
                        },
                        response: response.data.data || response.data,
                    },
                    pastRequests: [
                        {
                            request: {
                                method: params.method,
                                url: params.url,
                                headers: params.headers,
                                body: params.body,                
                            },
                            response: response.data.data || response.data,
                        }, 
                        ...state.pastRequests
                    ]
                }
            });
        })
        .catch(error => {
            console.error(error)
        });
    }
  };
  

  

  const triggerApiCall = (params) => {
    // if the method is 'get' or 'delete' AND there is a url attached to the request
    if ((params.method === 'GET' || params.method === 'DELETE') && params.url) {

      performApiRequest(params);

    } 
    // if the method is 'post' or 'put' then the request also needs a url AND body
    else if ((params.method === 'POST' || params.method === 'PUT') && params.url && params.body) {

      performApiRequest(params);

    } 
    // otherwise, console.error
    else {
      console.error('Improper request made. Request needs method and url. If method is PUT or POST, request also needs a body.')
    }
  }

  const fetchHistory = (idx) => {
    dispatch({
      type: 'fetchHistory',
      payload: {
        isLoading: false,
        output: state.pastRequests[idx],
        pastRequests: state.pastRequests
      }
    })
  }

  return (
    <section data-testid={'mainApp'} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <AppHeader />

      <Container style={{display: 'flex', justifyContent: 'space-evenly'}}>

        <Container style={{width: '50%'}}>
          <UserInputForm handleApiCall={triggerApiCall} />          
        </Container>

        <Container style={{width: '50%'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p>URL: {state.output && state.output.request && state.output.request.url}</p>
          <p>Request Method: {state.output && state.output.request && state.output.request.method}</p>

          </div>
          <DataDisplay data={state.output} isLoading={state.isLoading} />          
        </Container>

      </Container>

      <PreviousRequests data={state.pastRequests} loadHistory={fetchHistory}/>

      <Footer creator={'Reed Vogt'} />
    </section>
  );
}

export default MainApp;
