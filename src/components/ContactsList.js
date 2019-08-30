import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';
import { TITLE } from '../constants/constants';

class ContactsList extends React.Component {

  getContacts = () => {
    const { contactsList, contactMethods, title } = this.props;
    if (!contactsList.length) return null;
    return contactsList.map(item => (
      <Contact
        key={item.id}
        contact={item}
        isFavourite={title === TITLE.FAVOURITES}
        contactMethods={contactMethods}
      />
    ));
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        <h1 className="ui header"> {title} </h1>
        <div className="ui very relaxed list">
          {this.getContacts()}
        </div>
      </div>
    );
  }
}

ContactsList.defaultProps = {
  contactsList: [],
  title: '',
  contactMethods: {}
};

ContactsList.propTypes = {
  contactsList: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired
  })),
  title: PropTypes.string,
  contactMethods: PropTypes.exact({
    updateLikes: PropTypes.func,
    changeIsChecked: PropTypes.func,
    deleteContact: PropTypes.func
  })
};

export default ContactsList;
