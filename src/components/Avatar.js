import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_IAMGE } from '../constants/constants';

function Avatar({ image }) {
  return (
    <img
      className="ui mini avatar image"
      style={{ margin: 'auto' }}
      src={image}
      alt=""
      // eslint-disable-next-line no-param-reassign
      onError={(ev) => { ev.target.src = DEFAULT_IAMGE; }}
    />
  );
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired
};

export default Avatar;
