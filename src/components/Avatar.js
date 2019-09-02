import React from 'react';
import PropTypes from 'prop-types';

function Avatar({ image }) {
  return <img className="ui big avatar image" style={{ margin: 'auto' }} src={image} alt="" />;
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired
};

export default Avatar;
