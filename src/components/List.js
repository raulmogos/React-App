import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';

class List extends React.Component {

  get items() {
    const { array, text } = this.props;
    if (!array.length) return null;
    const isFavouriteList = text.toLowerCase().includes('favourites');
    return array.map(item => (
      <Contact
        key={item.id}
        contact={item}
        isFavourite={isFavouriteList}
      />
    ));
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        <h1 className="ui header"> {text} </h1>
        <div className="ui segments">
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
