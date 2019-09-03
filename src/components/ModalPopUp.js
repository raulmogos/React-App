import React from 'react';
import { Modal } from 'semantic-ui-react';

function ModalPopUp({ message, approve, reject }) {
  return (
    <div>
      <Modal open={true}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <p>
              We've found the following gravatar image associated with your e-mail
              address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default ModalPopUp;
