import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../Contact';

class ContactsList extends React.Component {

  componentDidMount() {
    const { areFavourites, fetchContacts, fetchFavourites } = this.props;
    if (!areFavourites) {
      fetchContacts();
    } else {
      fetchFavourites();
    }
  }

  getContacts = () => {
    const { contacts, areFavourites, favourites } = this.props;
    const contactsList = !areFavourites ? contacts : favourites;
    if (!contactsList.length) return null;
    return contactsList.map(item => (
      <Contact
        key={item.id}
        contact={item}
        isFavourite={areFavourites}
      />
    ));
  }

  render() {
    const { title } = this.props;
    return (
      <div className="ui fluid card">
        <div className="content">
          <h1 className="ui header"> {title} </h1>
        </div>
        <div className="content">
          <div className="ui very relaxed list">
            {this.getContacts()}
          </div>
        </div>
      </div>
    );
  }
}

ContactsList.defaultProps = {
  contacts: [],
  favourites: [],
  title: '',
  areFavourites: false
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired
  })),
  favourites: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired
  })),
  title: PropTypes.string,
  areFavourites: PropTypes.bool,
  fetchContacts: PropTypes.func.isRequired,
  fetchFavourites: PropTypes.func.isRequired
};

export default ContactsList;
