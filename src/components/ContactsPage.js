import React from 'react';
import List from './List';
import data from '../data/data';
import InLineSpinner from './InLineSpinner';

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
          <List array={contacts} text="Contacts" />
        </div>
        <div className="column">
          <List text="Favourites" />
        </div>
      </div>
    );
  }

  render() {
    return this.getAppropriateJSX;
  }
}

export default ContactsPage;
