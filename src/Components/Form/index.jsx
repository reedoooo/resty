import { useState } from 'react';
import { Button, Container, Form as BsForm } from 'react-bootstrap';
import './Form.scss';

function UserInputForm({ handleApiCall }) {
  const [selectedMethod, setSelectedMethod] = useState('');

  const [endpointUrl, updateEndpointUrl] = useState('');
  const [apiMethod, updateApiMethod] = useState('');
  const [requestBodyContent, updateRequestBodyContent] = useState('');
  const [requestBodyDisabled, setRequestBodyDisabled] = useState(true);

  // Constants for API urls
  const API_URLS = {
    pokeapi: 'https://pokeapi.co/api/v2/pokemon',
    yugiohapi: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',
  };

  const manageApiSelection = (event) => {
    const selectedApiUrl = API_URLS[event.target.value];
    updateEndpointUrl(''); // Clear out the previous URL
    updateEndpointUrl(selectedApiUrl); // Update to the newly selected API URL
  };

  const manageUrlInput = (event) => {
    updateEndpointUrl(event.target.value);
  };

  const manageMethodSelection = (event) => {
    const method = event.target.id.toUpperCase();
    setSelectedMethod(event.target.id); // Add this line
    updateApiMethod(method);
    setRequestBodyDisabled(!['PUT', 'POST'].includes(method));
  };

  const manageRequestBody = (event) => {
    let value = event.target.value;
    try {
      const json = JSON.parse(value);
      updateRequestBodyContent(json);
    } catch (error) {
      console.error('Invalid JSON input');
    }
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    const requestDetails = {
      method: apiMethod,
      url: endpointUrl,
      headers: {
        dummy: 'dummyHeader',
      },
      count: '5',
    };

    if (['PUT', 'POST'].includes(apiMethod)) {
      requestDetails.body = requestBodyContent;
    }

    await handleApiCall(requestDetails);

    // Reset form
    updateEndpointUrl('');
    updateApiMethod('');
    updateRequestBodyContent('');
    setRequestBodyDisabled(true);
    setSelectedMethod(''); // Add this line
  };

  return (
    <BsForm data-testid={'api-form'} onSubmit={handleFormSubmission}>
      <Container>
        <BsForm.Label>API Selection:</BsForm.Label>
        <BsForm.Control as="select" onChange={manageApiSelection}>
          <option value="">--Select an API--</option>
          <option value="pokeapi">Pokemon API</option>
          <option value="yugiohapi">Yugioh API</option>
        </BsForm.Control>
      </Container>
      <Container>
        <BsForm.Label>URL:</BsForm.Label>
        <div style={{ display: 'flex' }}>
          <BsForm.Control
            type="text"
            name="url"
            value={endpointUrl}
            onChange={manageUrlInput}
          />
        </div>
      </Container>
      <Container>
        <BsForm.Label>Request Body</BsForm.Label>
        <BsForm.Control
          as="textarea"
          rows={20}
          placeholder='{
            "key":"value"
            }'
          onChange={manageRequestBody}
          disabled={requestBodyDisabled}
          id="body-content"
        />
      </Container>
      <Container
        className="methods"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '0',
        }}
      >
        <Container>
          <BsForm.Check
            type="radio"
            label="GET"
            id="get"
            name="methods"
            checked={selectedMethod === 'get'} // Add this line
            onChange={manageMethodSelection}
          />
        </Container>
        <Container>
          <BsForm.Check
            type="radio"
            label="POST"
            id="post"
            name="methods"
            checked={selectedMethod === 'post'} // Add this line
            onChange={manageMethodSelection}
          />
        </Container>
        <Container>
          <BsForm.Check
            type="radio"
            label="PUT"
            id="put"
            name="methods"
            checked={selectedMethod === 'put'} // Add this line
            onChange={manageMethodSelection}
          />
        </Container>
        <Container>
          <BsForm.Check
            type="radio"
            label="DELETE"
            id="delete"
            name="methods"
            checked={selectedMethod === 'delete'} // Add this line
            onChange={manageMethodSelection}
          />
        </Container>
      </Container>
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          className="custom-button"
          data-testid="form-submit-button"
          style={{ margin: '0', width: '100%' }}
          type="submit"
        >
          GO!
        </Button>
      </Container>
    </BsForm>
  );
}

export default UserInputForm;
