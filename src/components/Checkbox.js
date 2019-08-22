import React from 'react';
import PropTypes from 'prop-types';

const configStyle = {
  true: 'check black circular icon',
  false: 'circular icon'
};

function Checkbox({ isChecked, action }) {
  return <i className={configStyle[isChecked]} onClick={action} />;
}

Checkbox.defaultProps = {
  isChecked: false,
  action: null
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  action: PropTypes.func
};

export default Checkbox;
