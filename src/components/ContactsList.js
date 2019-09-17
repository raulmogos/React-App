import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Contact from './Contact';
import { fetchContacts } from '../actions';

class ContactsList extends React.Component {

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { areFavourites, fetchContacts } = this.props;
    if (areFavourites) {
      fetchContacts();
    }
  }

  getContacts = () => {
    const { contacts, areFavourites } = this.props;
    const contactsList = !areFavourites ? Object.values(contacts) : [];
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
  contacts: {},
  title: '',
  areFavourites: false
};

ContactsList.propTypes = {
  contacts: PropTypes.objectOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired
  })),
  title: PropTypes.string,
  areFavourites: PropTypes.bool,
  fetchContacts: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

export default connect(mapStateToProps, { fetchContacts })(ContactsList);
