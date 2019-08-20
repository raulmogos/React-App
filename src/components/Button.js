import React from 'react';
import PropTypes from 'prop-types';
import { CUSTOM_TYPES_BUTTONS } from '../constants/constants';

function Button({ customType }) {
  return (
    <button
      className="circular ui icon button"
      type="button"
    >
      <i className={CUSTOM_TYPES_BUTTONS[customType]} />
    </button>
  );
}

Button.defaultProps = {
  customType: 'standard'
};

Button.propTypes = {
  customType: PropTypes.string
};

export default Button;
