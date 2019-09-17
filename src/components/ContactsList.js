import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Contact from './Contact';
import { TITLE } from '../constants/constants';
import { fetchContacts } from '../actions';

class ContactsList extends React.Component {

  componentDidMount() {
    const { areFavourites, fetchContacts } = this.props;
    if (areFavourites) {
      fetchContacts();
    }
  }

  getContacts = () => {
    const { contacts, contactMethods, areFavourites } = this.props;
    const contactsList = !areFavourites ? Object.values(contacts) : [];
    if (!contactsList.length) return null;
    return contactsList.map(item => (
      <Contact
        key={item.id}
        contact={item}
        isFavourite={areFavourites}
        contactMethods={contactMethods}
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
  contactsList: [],
  title: '',
  contactMethods: {}
};

// ContactsList.propTypes = {
//   contactsList: PropTypes.arrayOf(PropTypes.exact({
//     id: PropTypes.string.isRequired,
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     likes: PropTypes.number.isRequired,
//     isChecked: PropTypes.bool.isRequired
//   })),
//   title: PropTypes.string,
//   contactMethods: PropTypes.exact({
//     updateLikes: PropTypes.func,
//     changeIsChecked: PropTypes.func,
//     deleteContact: PropTypes.func
//   })
// };

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

export default connect(mapStateToProps, { fetchContacts })(ContactsList);
