import DataFetchingIndicator from '../Loading';
import './Results.scss';

function DataDisplay({ isLoading, data, currentRequest }) {
  const renderNames = () => {
    if (data && data.response) {
      console.log(data.response); // Log the response to see its structure

      // Check which API we are dealing with
      if (
        data.request.url.includes('pokeapi.co') &&
        data.response.results &&
        Array.isArray(data.response.results)
      ) {
        // Handle Pokemon API data structure
        return data.response.results
          .slice(0, 20)
          .map((item, index) => <p key={index}>{item.name}</p>);
      } else if (
        data.request.url.includes('ygoprodeck.com') &&
        Array.isArray(data.response)
      ) {
        // Handle Yugioh API data structure
        return data.response.map((item, index) => (
          <p key={index}>{item.name}</p>
        ));
      }
    }
  };

  return (
    <div data-testid={'data-display'} style={{ height: '75vh' }}>
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
      {isLoading ? <DataFetchingIndicator /> : renderNames()}
    </div>
  );
}

export default DataDisplay;
