import React from 'react';
import './ContactsPage.css';
import ContactsList from './ContactsList';
// import data from '../data/data';
import AddContactForm from './AddContactForm';
import Popup from './Popup';
import {
  validateInput,
  generateId,
  isContactUnique
} from '../helpers/helper';
import {
  TITLE,
  REGEX,
  WARNING_MESSAGES,
  APPROVE_FLAGS
} from '../constants/constants';

class ContactsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      popoup: {
        showPopup: false,
        message: '',
        contactIdToDelete: null,
        popupType: null

      }
    };
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    if (contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      localStorage.clear();
    }
  }
  
  addContact = (firstName, lastName, image) => {
    const { contacts } = this.state;
    if (!(validateInput(firstName, REGEX.NAME)
      && validateInput(lastName, REGEX.NAME)
      && validateInput(image, REGEX.URL))) {
      return;
    }
    const newContact = {
      id: generateId(),
      firstName,
      lastName,
      image,
      likes: 0,
      isChecked: false
    };
    if (!isContactUnique(contacts, newContact)) {
      return;
    }
    this.setState({ contacts: [newContact, ...contacts] });
  }

  areContactsWithLikes = () => {
    const { contacts } = this.state;
    return contacts.some(item => item.likes);
  };

  clearAllContactsLikes = () => {
    const { contacts } = this.state;
    const updatedContacts = contacts.map(contact => ({ ...contact, likes: 0 }));
    this.setState({ contacts: updatedContacts });
  }

  anyContactSelected = () => {
    const { contacts } = this.state;
    return contacts.some(x => x.isChecked);
  }

  deleteSelectedContacts = () => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(x => !x.isChecked);
    this.setState({ contacts: updatedContacts });
  }

  numberOfSelectedContacts = () => {
    const { contacts } = this.state;
    return contacts.filter(x => x.isChecked).length || null;
  }

  changeIsChecked = (id) => {
    const { contacts } = this.state;
    const contact = contacts.find(item => item.id === id);
    contact.isChecked = !contact.isChecked;
    this.setState({ contacts });
  }

  updateLikes = (id, step) => {
    const { contacts } = this.state;
    contacts.find(item => item.id === id).likes += step;
    this.setState({ contacts });
  }

  deleteContact = (id) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(c => c.id !== id);
    this.setState({ contacts: updatedContacts });
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
      case APPROVE_FLAGS.DELETE_ONE:
        const { popoup } = this.state;
        this.deleteContact(popoup.contactIdToDelete);
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
      contactMethods={{
        updateLikes: (id, step) => this.updateLikes(id, step),
        changeIsChecked: id => this.changeIsChecked(id),
        deleteContact: id => this.openDeleteContactPopUp(id)
      }}
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
      false
        ? (
          <div>
            <h1 className="ui center aligned header">No Contacts.</h1>
            <h3 className="ui center aligned header">Please refresh !</h3>
          </div>
        )
        : (
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
                <AddContactForm onSubmitAction={this.addContact} />
              </div>
            </div>
          </div>
        )
    );
  }
}

export default ContactsPage;
