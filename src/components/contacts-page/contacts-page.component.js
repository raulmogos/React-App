import React from 'react';
import PropTypes from 'prop-types';
import './contacts-page.style.css';
import ContactsList from '../contacts-list';
import AddContactForm from '../add-contact-form';
import Popup from '../Popup';
import {
  TITLE,
  WARNING_MESSAGES,
  APPROVE_FLAGS
} from '../../constants/constants';

class ContactsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popoup: {
        showPopup: false,
        message: '',
        contactIdToDelete: null,
        popupType: null
      }
    };
  }

  areContactsWithLikes = () => {
    const { contacts } = this.props;
    return contacts.some(item => item.likes);
  };

  clearAllContactsLikes = () => {
    const { _clearContacts } = this.props;
    _clearContacts();
  }

  anyContactSelected = () => {
    const { contacts } = this.props;
    return contacts.some(x => x.isChecked);
  }

  deleteSelectedContacts = () => {
    const { _deleteSelectedContacts } = this.props;
    _deleteSelectedContacts();
  }

  numberOfSelectedContacts = () => {
    const { contacts } = this.props;
    return contacts.filter(x => x.isChecked).length || null;
  }

  openDeleteContactPopUp = (id) => {
    this.setState({
      popoup: {
        showPopup: true,
        message: WARNING_MESSAGES.DELETE_ONE,
        popupType: APPROVE_FLAGS.DELETE_ONE,
        contactIdToDelete: id
      }
    });
  }

  openDeleteSelectedContactsPopUp = () => {
    this.setState({
      popoup: {
        showPopup: true,
        message: WARNING_MESSAGES.DELETE_SELECTED,
        popupType: APPROVE_FLAGS.DELETE_SELECTED
      }
    });
  }

  openClearAllContactsLikesPopUp = () => {
    this.setState({
      popoup: {
        showPopup: true,
        message: WARNING_MESSAGES.CLEAR_LIKES,
        popupType: APPROVE_FLAGS.CLEAR_LIKES
      }
    });
  }
  
  closePopUp = () => {
    this.setState({ popoup: { showPopup: false } });
  }

  onPopupConfirmation = (popupType) => {
    switch (popupType) {
      case APPROVE_FLAGS.CLEAR_LIKES:
        this.clearAllContactsLikes();
        break;
      case APPROVE_FLAGS.DELETE_SELECTED:
        this.deleteSelectedContacts();
        break;
      default:
        break;
    }
    this.closePopUp();
  }
  
  renderContactsList = () => (
    <ContactsList
      title={TITLE.CONTACTS}
      areFavourites={false}
    />
  );

  renderDeleteSelectedButton = () => (
    <div className="margin-top">
      <button
        className="fluid ui button olive"
        type="button"
        onClick={this.openDeleteSelectedContactsPopUp}
      >Delete selected {this.numberOfSelectedContacts()}
      </button>
    </div>
  );

  renderClearAllButton = () => (
    <div className="margin-top">
      <button
        className="fluid ui button olive margin"
        type="button"
        onClick={this.openClearAllContactsLikesPopUp}
      >Clear All
      </button>
    </div>
  )

  render() {
    const { popoup } = this.state;
    const {
      showPopup,
      message,
      popupType
    } = popoup;
    return (
      <div>
        <Popup
          isOpen={showPopup}
          message={message}
          reject={this.closePopUp}
          approve={() => this.onPopupConfirmation(popupType)}
        />
        <div className="ui two column stackable center aligned grid">
          <div className="column">
            {this.renderContactsList()}
            {this.anyContactSelected() && this.renderDeleteSelectedButton()}
          </div>
          <div className="column">
            <ContactsList
              title={TITLE.FAVOURITES}
              areFavourites={true}
            />
            {this.areContactsWithLikes() && this.renderClearAllButton()}
          </div>
        </div>
        <div className="margin-bottom margin-top">
          <div className="ui container segment">
            <AddContactForm />
          </div>
        </div>
      </div>
    );
  }
}

ContactsPage.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired
  })).isRequired,
  _deleteSelectedContacts: PropTypes.func.isRequired,
  _clearContacts: PropTypes.func.isRequired
};

export default ContactsPage;
