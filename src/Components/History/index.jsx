import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function PreviousRequests({ data, loadHistory }) {
  const [displayModal, updateDisplayModal] = useState(false);

  const getApiName = (url) => {
    if (url.includes('pokeapi.co')) {
      return 'Pokemon';
    } else if (url.includes('ygoprodeck.com')) {
      return 'Yu-Gi-Oh';
    } else {
      return 'Unknown API';
    }
  };

  return (
    <>
      <Button
        className="custom-button"
        onClick={() => {
          updateDisplayModal(!displayModal);
        }}
      >
        Request Log
      </Button>

      <Modal
        show={displayModal}
        onHide={() => {
          updateDisplayModal(!displayModal);
        }}
        centered
      >
        <Modal.Header>API Call Log</Modal.Header>

        <Modal.Body>
          {data.map((entry, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0.5rem 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '90%',
                  overflowX: 'hidden',
                }}
              >
                <strong style={{ marginRight: '0.5rem' }}>
                  {entry.request.method} ({getApiName(entry.request.url)})
                </strong>
                <p>{entry.request.url}</p>
              </div>
              <Button
                className="custom-button"
                onClick={() => {
                  loadHistory(index);
                  updateDisplayModal(!displayModal);
                }}
              >
                Reload
              </Button>
            </div>
          ))}
        </Modal.Body>

        <Modal.Footer>Footer section</Modal.Footer>
      </Modal>
    </>
  );
}

export default PreviousRequests;
