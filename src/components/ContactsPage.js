import React from 'react';
import './ContactsPage.css';
import ContactsList from './ContactsList';
import data from '../data/data';
import InLineSpinner from './InLineSpinner';
import { getFavouritesList } from '../helpers/helper';
import { TITLE } from '../constants/constants';

class ContactsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }

  componentDidMount() {
    const oldData = localStorage.getItem('contacts');
    if (!oldData) {
      this.setState({ contacts: [...data] });
    } else {
      this.setState({ contacts: [...JSON.parse(oldData)] });
    }
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    if (contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      localStorage.clear();
    }
  }

  areContactsWithLikes = () => {
    const { contacts } = this.state;
    return contacts.some(item => item.likes);
  };

  clearAllContactsLikes = () => {
    const { contacts } = this.state;
    contacts.forEach((item) => {
      if (item.likes) {
        // eslint-disable-next-line no-param-reassign
        item.likes = 0;
      }
    });
    this.setState({ contacts });
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
  
  numberOfSelectedContacts() {
    const { contacts } = this.state;
    return contacts.filter(x => x.isChecked).length || null;
  }

  changeIsChecked(id) {
    const { contacts } = this.state;
    const contact = contacts.find(item => item.id === id);
    contact.isChecked = !contact.isChecked;
    this.setState({ contacts });
  }

  updateLikes(id, step) {
    const { contacts } = this.state;
    contacts.find(item => item.id === id).likes += step;
    this.setState({ contacts });
  }

  deleteContact(id) {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(c => c.id !== id);
    this.setState({ contacts: updatedContacts });
  }
  
  renderContactsList = () => {
    const { contacts } = this.state;
    return (
      <ContactsList
        contactsList={contacts}
        title={TITLE.CONTACTS}
        contactMethods={{
          updateLikes: (id, step) => this.updateLikes(id, step),
          changeIsChecked: id => this.changeIsChecked(id),
          deleteContact: id => this.deleteContact(id)
        }}
      />
    );
  }

  renderDeleteSelectedButton = () => (
    <div className="ui segment">
      <button
        className="fluid ui button olive"
        type="button"
        onClick={this.deleteSelectedContacts}
        disabled={!this.anyContactSelected()}
      >Delete selected {this.numberOfSelectedContacts()}
      </button>
    </div>
  );

  renderClearAllButton = () => (
    <div
      className="ui segment"
      style={{
        width: '50%',
        margin: 'auto',
        marginTop: '1rem',
      }}
    >
      <button
        className="fluid ui button olive"
        type="button"
        onClick={this.clearAllContactsLikes}
      >Clear All
      </button>
    </div>
  )

  render() {
    const { contacts } = this.state;
    return (
      !contacts.length
        ? <InLineSpinner />
        : (
          <div className="ui two column stackable center aligned grid">
            <div className="column">
              { this.renderContactsList() }
              { this.renderDeleteSelectedButton() }
            </div>
            <div className="column">
              <ContactsList
                title={TITLE.FAVOURITES}
                contactsList={getFavouritesList(contacts)}
              />
              {this.areContactsWithLikes() && this.renderClearAllButton()}
            </div>
          </div>
        )
    );
  }
}

export default ContactsPage;
