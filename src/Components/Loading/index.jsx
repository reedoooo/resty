// import React from "react";
import { Spinner } from 'react-bootstrap';

function DataFetchingIndicator() {
  console.log('Retrieving API call data...');

  return (
    <div>
      <Spinner
        animation="border"
        role="status"
        data-testid="data-fetching-indicator"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
      Fetching data...
    </div>
  );
}

export default DataFetchingIndicator;
