import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';

class List extends React.Component {

  get items() {
    const { array, methods, text } = this.props;
    if (!array.length) return null;
    const isFavouriteList = text.toLowerCase().includes('favourites');
    return array.map(item => (
      <Contact
        key={item.id}
        contact={item}
        isFavourite={isFavouriteList}
        methods={methods}
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
  text: '',
  methods: {}
};

List.propTypes = {
  array: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired
  })),
  text: PropTypes.string,
  methods: PropTypes.exact({
    increaseLikes: PropTypes.func,
    decreaseLikes: PropTypes.func,
    changeIsChecked: PropTypes.func,
    deleteContact: PropTypes.func
  })
};

export default List;
