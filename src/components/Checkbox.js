import React from 'react';
import PropTypes from 'prop-types';
import { STYLE } from '../constants/constants';

function Checkbox({ isChecked, action }) {
  const style = isChecked ? STYLE.CHECKBOX.checked : STYLE.CHECKBOX.unchecked;
  return <i className={style} onClick={action} />;
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
