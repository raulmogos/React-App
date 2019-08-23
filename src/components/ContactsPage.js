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
    this.setState({ contacts: [...data] });
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
