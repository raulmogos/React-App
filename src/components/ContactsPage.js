import React from 'react';
import ContactsList from './ContactsList';
import data from '../data/data';
import { generateId } from '../helpers/helper';
import InLineSpinner from './InLineSpinner';
import AddContactForm from './AddContactForm';
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
  
  renderContactsList = () => {
    const { contacts } = this.state;
    return (
      <ContactsList
        contactsList={contacts}
        title={TITLE.CONTACTS}
        contactMethods={{
          updateLikes: (id, step) => this.updateLikes(id, step),
          changeIsChecked: id => this.changeIsChecked(id)
        }}
      />
    );
  }

  render() {
    const { contacts } = this.state;
    return (
      !contacts.length
        ? <InLineSpinner />
        : (
          <div>
            <div className="ui two column stackable center aligned grid">
              <div className="column">
                {this.renderContactsList()}
              </div>
              <div className="column">
                <ContactsList title={TITLE.FAVOURITES} />
              </div>
            </div>
            <div className="ui container">
              <div className="ui segment">
                <AddContactForm onSubmitAction={this.addContact} />
              </div>
            </div>
          </div>
        )
    );
  }
}

export default ContactsPage;
