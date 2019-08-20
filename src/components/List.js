import React from 'react';
import PropTypes from 'prop-types';

import Contact from './Contact';


class List extends React.Component {

  get items() {
    const { array } = this.props;
    if (!array.length) return null;
    return array.map(item => (
      <Contact
        key={item.id}
        contact={item}
        isFavourite={true}
      />
    ));
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        <h1 className="ui header"> {text} </h1>
        <div className="ui container">
          {this.items}
        </div>
      </div>
    );
  }
}

List.defaultProps = {
  array: [],
  text: ''
};

List.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object),
  text: PropTypes.string
};

export default List;
