import React from 'react';
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

  increaseLikes(id) {
    this.setState((prevState) => {
      const contacts = [...prevState.contacts];
      contacts.find(item => item.id === id).likes += 1;
      return { contacts };
    });
  }

  decreaseLikes(id) {
    this.setState((prevState) => {
      const contacts = [...prevState.contacts];
      contacts.find(item => item.id === id).likes -= 1;
      return { contacts };
    });
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
          <div className="ui two column stackable center aligned grid">
            <div className="column">
              {this.renderContactsList()}
            </div>
            <div className="column">
              <ContactsList
                contactsList={getFavouritesList(contacts)}
                title={TITLE.FAVOURITES}
              />
            </div>
          </div>
        )
    );
  }
}

export default ContactsPage;
