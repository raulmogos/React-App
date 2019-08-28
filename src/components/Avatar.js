import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';

function Avatar({ image }) {
  return <img className="ui mini avatar image align-middle same-dim" src={image} alt="" />;
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired
};

export default Avatar;
