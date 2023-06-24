import React from 'react';
import DataFetchingIndicator from '../Loading';
import './Results.scss';

function DataDisplay({ isLoading, data, currentRequest }) {
  const renderData = () => {
    if (data && data.response) {
      console.log(data.response); // Log the response to see its structure

      if (typeof data.response === 'object') {
        return (
          <div>
            <h2>Response:</h2>
            <pre>{JSON.stringify(data.response, null, 2)}</pre>
          </div>
        );
      }

      return <p>{data.response}</p>;
    }

    return null;
  };

  return (
    <div data-testid={'data-display'}>
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
      {isLoading ? <DataFetchingIndicator /> : renderData()}
    </div>
  );
}

export default DataDisplay;
