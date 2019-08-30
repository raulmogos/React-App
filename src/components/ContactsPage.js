import React from 'react';
import './ContactsPage.css';
import ContactsList from './ContactsList';
import data from '../data/data';
import InLineSpinner from './InLineSpinner';
import AddContactForm from './AddContactForm';
import { getFavouritesList, generateId } from '../helpers/helper';
import { validateName, validateImageUrl } from '../helpers/validation';
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
  
  addContact = (firstName, lastName, image) => {
    const { contacts } = this.state;
    if (!(validateName(firstName) && validateName(lastName) && validateImageUrl(image))) {
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
    contacts.unshift(newContact);
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

  render() {
    const { contacts } = this.state;
    return (
      !contacts.length
        ? <InLineSpinner />
        : (
          <div>
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
              </div>
            </div>
            <div className="ui container segment margin-bottom">
              <AddContactForm onSubmitAction={this.addContact} />
            </div>
          </div>
        )
    );
  }
}

export default ContactsPage;
