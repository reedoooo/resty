import { useState } from 'react';
import { Button, Container, Form as BsForm } from 'react-bootstrap';
import Select from 'react-select'; // don't forget to install this
import './Form.scss';

function UserInputForm({ handleApiCall, apiEndpointsData }) {
  const [endpointUrl, updateEndpointUrl] = useState('');
  const [apiMethod, updateApiMethod] = useState('');
  const [requestBodyContent, updateRequestBodyContent] = useState('');
  const [requestBodyDisabled, setRequestBodyDisabled] = useState(true);
  const [jsonError, setJsonError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('');

  const manageEndpointSelection = (selectedOption) => {
    updateEndpointUrl(selectedOption.value);
  };

  const options = apiEndpointsData.map((endpoint) => {
    return { value: endpoint.url, label: endpoint.name };
  });

  const manageUrlInput = (event) => {
    updateEndpointUrl(event.target.value);
  };

  const manageMethodSelection = (event) => {
    const method = event.target.id.toUpperCase();
    setSelectedMethod(event.target.id);
    updateApiMethod(method);
    setRequestBodyDisabled(!['PUT', 'POST'].includes(method));
  };

  const manageRequestBody = (event) => {
    let value = event.target.value;
    try {
      const json = JSON.parse(value);
      updateRequestBodyContent(json);
      setJsonError(null);
    } catch (error) {
      console.error('Invalid JSON input');
      updateRequestBodyContent(null);
      setJsonError('Invalid JSON input');
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
  };

  return (
    <BsForm
      data-testid={'api-form'}
      onSubmit={handleFormSubmission}
      // style={{ height: '75vh' }}
    >
      {/* API Endpoint selection */}
      <Container className="formInput">
        <Container>
          <BsForm.Label>API Endpoint:</BsForm.Label>
          <Select
            options={options}
            isSearchable={true}
            onChange={manageEndpointSelection}
            value={options.find((option) => option.value === endpointUrl)}
          />
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
          {/* Display JSON parsing error if it exists */}
          {jsonError && <p style={{ color: 'red' }}>{jsonError}</p>}
        </Container>
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
