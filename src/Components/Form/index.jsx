import { useState } from "react";
import { Button, Container, Form as BsForm } from "react-bootstrap";
import "./Form.scss";

function UserInputForm({ handleApiCall }) {
  const [endpointUrl, updateEndpointUrl] = useState("");
  const [apiMethod, updateApiMethod] = useState("");
  const [requestBodyContent, updateRequestBodyContent] = useState("");
  const [requestBodyDisabled, setRequestBodyDisabled] = useState(true);

  const manageUrlInput = (event) => {
    updateEndpointUrl(event.target.value);
  };

  // const getRandomAPI = () => {
  //   const apiList = [
  //     'https://pokeapi.co/api/v2/pokemon', 
  //     'https://db.ygoprodeck.com/api/v7/cardinfo.php'
  //   ];
    
  //   const randomIndex = Math.floor(Math.random() * apiList.length);
    
  //   return apiList[randomIndex];
  // };
  

  const manageMethodSelection = (event) => {
    const method = event.target.id.toUpperCase();
    updateApiMethod(method);
    setRequestBodyDisabled(!["PUT", "POST"].includes(method));
  };

  const manageRequestBody = (event) => {
    let value = event.target.value;
    try {
      const json = JSON.parse(value);
      updateRequestBodyContent(json);
    } catch (error) {
      console.error("Invalid JSON input");
    }
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const requestDetails = {
      method: apiMethod,
      url: endpointUrl,
      headers: {
        dummy: "dummyHeader",
      },
      body: requestBodyContent,
      count: "5",
    };
    await handleApiCall(requestDetails);

    // Reset form
    updateEndpointUrl("");
    updateApiMethod("");
    updateRequestBodyContent("");
    setRequestBodyDisabled(true);
  };

  return (
    <BsForm data-testid={"api-form"} onSubmit={handleFormSubmission}>
      <Container>
        <BsForm.Label>URL:</BsForm.Label>
        <div style={{ display: "flex" }}>
          <BsForm.Control
            type="text"
            name="url"
            placeholder="https://db.ygoprodeck.com/api/v7/cardinfo.php/"
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
          display: "flex",
          justifyContent: "space-around",
          padding: "0",
        }}
      >
        <Container>
          <BsForm.Check
            type="radio"
            label="GET"
            id="get"
            name="methods"
            onChange={manageMethodSelection}
          />
        </Container>

        <Container>
          <BsForm.Check
            type="radio"
            label="POST"
            id="post"
            name="methods"
            onChange={manageMethodSelection}
          />
        </Container>

        <Container>
          <BsForm.Check
            type="radio"
            label="PUT"
            id="put"
            name="methods"
            onChange={manageMethodSelection}
          />
        </Container>

        <Container>
          <BsForm.Check
            type="radio"
            label="DELETE"
            id="delete"
            name="methods"
            onChange={manageMethodSelection}
          />
        </Container>
      </Container>

      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="custom-button"
          data-testid="form-submit-button"
          style={{ margin: "0", width: "100%" }}
          type="submit"
        >
          GO!
        </Button>
      </Container>
    </BsForm>
  );
}

export default UserInputForm;
