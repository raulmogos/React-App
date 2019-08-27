import React from 'react';
import List from './List';
import data from '../data/data';
import InLineSpinner from './InLineSpinner';
import { getFavouritesList } from '../helpers/helper';

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
    localStorage.clear();
    if (!contacts.length) return;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  get getAppropriateJSX() {
    const { contacts } = this.state;
    if (!contacts.length) return <InLineSpinner />;
    return (
      <div className="ui two column stackable center aligned grid">
        <div className="column">
          <List
            array={contacts}
            text="Contacts"
            methods={{
              increaseLikes: id => this.increaseLikes(id),
              decreaseLikes: id => this.decreaseLikes(id),
              changeIsChecked: id => this.changeIsChecked(id),
              deleteContact: id => this.deleteContact(id)
            }}
          />
          <button
            className="fluid ui button olive"
            type="button"
            onClick={this.deleteSelectedContacts}
          >Delete selected {this.numberSelecterdContacts() ? this.numberSelecterdContacts() : null}
          </button>
        </div>
        <div className="column">
          <List
            text="Favourites"
            array={getFavouritesList(contacts)}
          />
          <button
            className="fluid ui button olive"
            type="button"
            onClick={this.clearAllContacts}
            disabled={this.isContactWithLikes()}
          >Clear All
          </button>
        </div>
      </div>
    );
  }

  deleteSelectedContacts = () => {
    const { contacts } = this.state;
    const newContacts = contacts.filter(x => !x.isChecked);
    this.setState({ contacts: newContacts });
  }

  isContactWithLikes = () => {
    const { contacts } = this.state;
    return !contacts.some(item => item.likes);
  };

  clearAllContacts = () => {
    const { contacts } = this.state;
    // eslint-disable-next-line no-param-reassign
    contacts.forEach((item) => { item.likes = 0; });
    this.setState({ contacts });
  }
  
  numberSelecterdContacts() {
    const { contacts } = this.state;
    return contacts.filter(x => x.isChecked).length;
  }

  changeIsChecked(id) {
    this.setState((prevState) => {
      const contacts = [...prevState.contacts];
      const contact = contacts.find(item => item.id === id);
      contact.isChecked = !contact.isChecked;
      return { contacts };
    });
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

  deleteContact(id) {
    this.setState((prevState) => {
      const contacts = [...prevState.contacts];
      const index = contacts.findIndex(item => item.id === id);
      contacts.splice(index, 1);
      return { contacts };
    });
  }

  render() {
    return this.getAppropriateJSX;
  }
}

export default ContactsPage;
