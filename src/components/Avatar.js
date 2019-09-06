import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';
import { DEFAULT_IMAGE } from '../constants/constants';

function Avatar({ image }) {
  return (
    <img
      className="avatar"
      src={image}
      alt=""
      // eslint-disable-next-line no-param-reassign
      onError={(ev) => { ev.target.src = DEFAULT_IMAGE; }}
    />
  );
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired
};

export default Avatar;
