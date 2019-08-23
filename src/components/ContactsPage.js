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
              changeIsChecked: id => this.changeIsChecked(id)
            }}
          />
        </div>
        <div className="column">
          <List text="Favourites" array={getFavouritesList(contacts)} />
        </div>
      </div>
    );
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

  render() {
    return this.getAppropriateJSX;
  }
}

export default ContactsPage;
