import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import { HEADERS, IMAGE_POPUP } from '../constants/constants';

function Popup({
  isOpen,
  message,
  approve,
  reject
}) {
  return (
    <Modal open={isOpen} className="ui tiny modal" onClose={reject}>
      <Modal.Header>
        <h2 className="ui center aligned header">{HEADERS.WAIT_A_SEC}</h2>
      </Modal.Header>
      <Modal.Content className="image">
        <h1 className="ui center aligned header">{message}</h1>
        <img
          className="ui image centered"
          src={IMAGE_POPUP}
          alt=""
        />
      </Modal.Content>
      <Modal.Actions>
        <div className="ui black deny button" onClick={reject}>
          Nope
        </div>
        <div className="ui positive right labeled icon button" onClick={approve}>
          Yep
          <i className="checkmark icon" />
        </div>
      </Modal.Actions>
    </Modal>
  );
}

Popup.defaultProps = {
  isOpen: false,
  message: '',
  approve: null,
  reject: null
};

Popup.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  approve: PropTypes.func,
  reject: PropTypes.func
};

export default Popup;
