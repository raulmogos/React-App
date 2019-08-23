import React from 'react';
import PropTypes from 'prop-types';

function LikesLabel({ likes }) {
  return <div className="ui olive big circular label"> {likes} </div>;
}

LikesLabel.propTypes = {
  likes: PropTypes.number.isRequired
};

export default LikesLabel;
