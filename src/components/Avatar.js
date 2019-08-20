import React from 'react';
import PropTypes from 'prop-types';

function Avatar({ image }) {
  return (
    <img className="ui avatar image" src={image} alt="" />
  );
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired
};

export default Avatar;
